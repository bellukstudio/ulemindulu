<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Gift\CheckBankAccountApiUseCase;
use App\Application\Gift\CreateBankAccountApiUseCase;
use App\Application\Gift\DeleteBankAccountApiUseCase;
use App\Application\Gift\GetAllBankAccountApiUseCase;
use App\Application\Gift\UpdateBankAccountApiUseCase;
use App\Http\Controllers\Controller;
use App\Models\Invitation\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GiftController extends Controller
{
    protected $useCaseCreateBankAccount;
    protected $useCaseGetBankAccount;
    protected $useCaseUpdateBankAccount;
    protected $usecaseDeleteBankAccount;
    protected $useCaseCheckBankAccount;


    public function __construct(
        GetAllBankAccountApiUseCase $useCaseGetBankAccount,
        CreateBankAccountApiUseCase $useCaseCreateBankAccount,
        UpdateBankAccountApiUseCase $useCaseUpdateBankAccount,
        DeleteBankAccountApiUseCase $useCaseDeleteBankAccount,
        CheckBankAccountApiUseCase $useCaseCheckBankAccount

    ) {
        $this->useCaseGetBankAccount = $useCaseGetBankAccount;
        $this->useCaseCreateBankAccount = $useCaseCreateBankAccount;
        $this->useCaseUpdateBankAccount = $useCaseUpdateBankAccount;
        $this->usecaseDeleteBankAccount = $useCaseDeleteBankAccount;
        $this->useCaseCheckBankAccount = $useCaseCheckBankAccount;
    }


    public function createBankApiAccounts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bank_accounts' => 'required|array|max:5',
            'bank_accounts.*.bank_name' => 'required|string|max:100',
            'bank_accounts.*.account_number' => 'required|string|max:100',
            'bank_accounts.*.receiver_name' => 'required|string|max:100',
            'order_id' => 'required|exists:orders,id',
            'invitation_template_id' => 'required|exists:invitation_templates,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bankAccounts = $request->input('bank_accounts');
        $orderId = $request->input('order_id');
        $invitationTemplateId = $request->input('invitation_template_id');

        $existingCount = BankAccount::where('order_id', $orderId)
            ->where('invitation_template_id', $invitationTemplateId)
            ->count();

        if ($existingCount + count($bankAccounts) > 5) {
            return response()->json([
                'message' => 'Total bank account limit exceeded.'
            ], 422);
        }

        $this->useCaseCreateBankAccount->execute($orderId, $invitationTemplateId, $bankAccounts);

        return response()->json(['message' => 'Bank accounts created successfully'], 201);
    }


    public function checkBankAccount($orderId, $invitationTemplateId)
    {
        $bankAccounts = $this->useCaseCheckBankAccount->execute($orderId, $invitationTemplateId);
        $bankAccountsData = $this->useCaseGetBankAccount->execute($orderId, $invitationTemplateId);

        if ($bankAccounts > 0) {
            return response()->json([
                'message' => 'Bank account already exists for this order',
                'status' => true,
                'data' => $bankAccountsData
            ]);
        }

        return response()->json(['message' => 'Bank account not found', 'status' => true], 404);
    }

    ///
    // public function getAccountBank($orderId, $invitationTemplateId)
    // {
    //     try {
    //         $bankAccounts = $this->useCaseGetBankAccount->execute($orderId, $invitationTemplateId);

    //         return response()->json([
    //             'message' => 'Bank accounts retrieved successfully.',
    //             'data' => $bankAccounts,
    //         ]);
    //     } catch (\Throwable $e) {
    //         return response()->json([
    //             'message' => 'Failed to retrieve bank accounts.',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function updateBankApiAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bank_accounts' => 'required|array|max:5',
            'bank_accounts.*.bank_name' => 'required|string|max:100',
            'bank_accounts.*.account_number' => 'required|string|max:100',
            'bank_accounts.*.receiver_name' => 'required|string|max:100',
            'order_id' => 'required|exists:orders,id',
            'invitation_template_id' => 'required|exists:invitation_templates,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bankAccounts = $request->input('bank_accounts');
        $orderId = $request->input('order_id');
        $invitationTemplateId = $request->input('invitation_template_id');

        if (count($bankAccounts) > 5) {
            return response()->json([
                'message' => 'Total bank account limit exceeded.'
            ], 422);
        }

        try {
            BankAccount::where('order_id', $orderId)
                ->where('invitation_template_id', $invitationTemplateId)
                ->delete();

            $this->useCaseCreateBankAccount->execute($orderId, $invitationTemplateId, $bankAccounts);

            return response()->json(['message' => 'Bank accounts updated successfully.']);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update bank accounts.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteBankApiAccount($bankAccountId)
    {
        try {
            $this->usecaseDeleteBankAccount->execute($bankAccountId);

            return response()->json(['message' => 'Bank account deleted successfully.']);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to delete bank account.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
