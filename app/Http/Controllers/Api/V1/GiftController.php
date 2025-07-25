<?php

namespace App\Http\Controllers\Api\V1;

use App\Deps\GiftDependencies;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GiftController extends Controller
{
    private const MAX_BANK_ACCOUNTS = 5;

    private $useCaseGetBankAccount;
    private $useCaseCreateBankAccount;
    private $useCaseDeleteBankAccount;
    private  $useCaseCheckBankAccount;
    private  $usecaseGift;

    /**
     * GiftController constructor.
     */
    public function __construct(GiftDependencies $deps)
    {
        $this->useCaseGetBankAccount = $deps->useCaseGetBankAccount;
        $this->useCaseCreateBankAccount = $deps->useCaseCreateBankAccount;
        $this->useCaseDeleteBankAccount = $deps->useCaseDeleteBankAccount;
        $this->useCaseCheckBankAccount = $deps->useCaseCheckBankAccount;
        $this->usecaseGift = $deps->usecaseGift;
    }

    /**
     * @OA\Post(
     *     path="/api/v1/gift/bank-account",
     *     summary="Create bank accounts",
     *     tags={"Gift"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         description="Create bank accounts request body",
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="bank_accounts",
     *                 type="array",
     *                 maxItems=5,
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="bank_name", type="string", maxLength=100, example="Bank Mandiri"),
     *                     @OA\Property(property="account_number", type="string", maxLength=100, example="1234567890"),
     *                     @OA\Property(property="receiver_name", type="string", maxLength=100, example="John Doe")
     *                 )
     *             ),
     *             @OA\Property(property="order_id", type="integer", example=1),
     *             @OA\Property(property="invitation_template_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Bank accounts created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bank accounts created successfully"),
     *             @OA\Property(property="status", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function createBankApiAccounts(Request $request): JsonResponse
    {
        try {
            $validatedData = $this->validateBankAccountRequest($request);

            $this->checkBankAccountLimit(
                $validatedData['order_id'],
                $validatedData['invitation_template_id'],
                count($validatedData['bank_accounts'])
            );

            DB::transaction(function () use ($validatedData) {
                $this->useCaseCreateBankAccount->execute(
                    $validatedData['order_id'],
                    $validatedData['invitation_template_id'],
                    $validatedData['bank_accounts']
                );
            });

            return ApiResponse::success([
                'message' => 'Bank accounts created successfully',
            ], 'Bank accounts created successfully', 201);
        } catch (\InvalidArgumentException $e) {
            return ApiResponse::error($e->getMessage(), 422);
        } catch (\Throwable $e) {
            Log::error('Failed to create bank accounts', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return ApiResponse::error([
                'message' => 'Failed to create bank accounts',
            ], 'Failed to create bank accounts', 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/v1/gift/bank-account/{order_id}/{invitation_template_id}",
     *     summary="Check if bank accounts exist for order and invitation template",
     *     description="Returns bank account data if available, or 404 if not found",
     *     operationId="checkBankAccount",
     *     tags={"Gift"},
     *     @OA\Parameter(
     *         description="Order ID",
     *         in="path",
     *         name="order_id",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Parameter(
     *         description="Invitation template ID",
     *         in="path",
     *         name="invitation_template_id",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Bank accounts found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bank accounts found"),
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="bank_name", type="string", example="Bank Mandiri"),
     *                     @OA\Property(property="account_number", type="string", example="1234567890"),
     *                     @OA\Property(property="receiver_name", type="string", example="John Doe")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Bank accounts not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bank accounts not found"),
     *             @OA\Property(property="status", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function checkBankAccount(string $orderId, string $invitationTemplateId): JsonResponse
    {
        try {
            $count = $this->useCaseCheckBankAccount->execute($orderId, $invitationTemplateId);

            if ($count > 0) {
                $bankAccounts = $this->useCaseGetBankAccount->execute($orderId, $invitationTemplateId);
                return ApiResponse::success([
                    'message' => 'Bank accounts found',
                    'bank' => $bankAccounts,

                ]);
            }

            return ApiResponse::error([
                'message' => 'Bank accounts not found',
            ], 'Bank accounts not found', 404);
        } catch (\Throwable $e) {
            Log::error('Failed to check bank accounts', [
                'error' => $e->getMessage(),
                'order_id' => $orderId,
                'invitation_template_id' => $invitationTemplateId
            ]);

            return ApiResponse::error([
                'message' => 'Failed to check bank accounts',
            ], 'Failed to check bank accounts', 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/v1/gift/bank-account",
     *     summary="Update bank accounts",
     *     tags={"Gift"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         description="Update bank accounts request body",
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="bank_accounts",
     *                 type="array",
     *                 maxItems=5,
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="bank_name", type="string", maxLength=100, example="Bank Mandiri"),
     *                     @OA\Property(property="account_number", type="string", maxLength=100, example="1234567890"),
     *                     @OA\Property(property="receiver_name", type="string", maxLength=100, example="John Doe")
     *                 )
     *             ),
     *             @OA\Property(property="order_id", type="integer", example=1),
     *             @OA\Property(property="invitation_template_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Bank accounts updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bank accounts updated successfully"),
     *             @OA\Property(property="status", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function updateBankApiAccount(Request $request): JsonResponse
    {
        try {
            $validatedData = $this->validateBankAccountRequest($request);

            if (count($validatedData['bank_accounts']) > self::MAX_BANK_ACCOUNTS) {
                return ApiResponse::error([
                    'message' => 'Maximum bank accounts allowed is ' . self::MAX_BANK_ACCOUNTS
                ], 422);
            }

            DB::transaction(function () use ($validatedData) {
                // Delete existing bank accounts
                $this->usecaseGift->deleteBankAccount($validatedData['order_id'], $validatedData['invitation_template_id']);

                // Create new bank accounts
                $this->useCaseCreateBankAccount->execute(
                    $validatedData['order_id'],
                    $validatedData['invitation_template_id'],
                    $validatedData['bank_accounts']
                );
            });

            return ApiResponse::success([
                'message' => 'Bank accounts updated successfully'
            ], 'Bank accounts updated successfully', 200);
        } catch (\InvalidArgumentException $e) {
            return ApiResponse::error([
                'message' => $e->getMessage()
            ], 'Validation error', 422);
        } catch (\Throwable $e) {
            Log::error('Failed to update bank accounts', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return ApiResponse::error([
                'message' => 'Failed to update bank accounts ' . $e->getMessage(),
            ], 'Failed to update bank accounts', 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/gift/bank-account/{bankAccountId}",
     *     summary="Delete a bank account",
     *     tags={"Gift"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         description="Bank account ID",
     *         in="path",
     *         name="bankAccountId",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Bank account deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Bank account deleted successfully"),
     *             @OA\Property(property="status", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Bank account not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function deleteBankApiAccount(string $bankAccountId): JsonResponse
    {
        try {
            DB::transaction(function () use ($bankAccountId) {
                $this->useCaseDeleteBankAccount->execute($bankAccountId);
            });

            return ApiResponse::success([
                'message' => 'Bank account deleted successfully'
            ], 'Bank account deleted successfully', 200);
        } catch (\Throwable $e) {
            Log::error('Failed to delete bank account', [
                'error' => $e->getMessage(),
                'bank_account_id' => $bankAccountId
            ]);

            return ApiResponse::error([
                'message' => 'Failed to delete bank account ' . $e->getMessage(),
            ], 'Failed to delete bank account', 500);
        }
    }

    /**
     * Validate bank account request data
     */
    private function validateBankAccountRequest(Request $request): array
    {
        $validator = Validator::make($request->all(), [
            'bank_accounts' => 'required|array|max:' . self::MAX_BANK_ACCOUNTS,
            'bank_accounts.*.bank_name' => 'required|string|max:100',
            'bank_accounts.*.account_number' => 'required|string|max:100',
            'bank_accounts.*.receiver_name' => 'required|string|max:100',
            'order_id' => 'required|uuid|exists:orders,id',
            'invitation_template_id' => 'required|uuid|exists:invitation_templates,id',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }

        return $validator->validated();
    }

    /**
     * Check if adding new bank accounts would exceed the limit
     */
    private function checkBankAccountLimit(string $orderId, string $invitationTemplateId, string $newAccountsCount): void
    {
        $existingCount = $this->usecaseGift->countBankAccount($orderId, $invitationTemplateId);

        if ($existingCount + $newAccountsCount > self::MAX_BANK_ACCOUNTS) {
            throw new \InvalidArgumentException('Bank account limit exceeded');
        }
    }
}
