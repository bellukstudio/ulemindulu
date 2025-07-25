<?php

namespace App\Http\Controllers\Api\V1;


use App\Deps\OrderDependencies;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $useCaseCreateOrder;
    protected $useCaseGetTemplateOrder;
    protected $useCaseShowTemplateOrder;
    protected $useCaseClient;
    protected $useCaseTemplate;

    public function __construct(
        OrderDependencies $deps
    ) {
        $this->useCaseCreateOrder = $deps->createOrderApiUseCase;
        $this->useCaseGetTemplateOrder = $deps->getAllTemplateOrderApiUseCase;
        $this->useCaseShowTemplateOrder = $deps->showTemplateOrderApiUseCase;
        $this->useCaseClient = $deps->useCaseclient;
        $this->useCaseTemplate = $deps->useCasetemplate;
    }


    /**
     * Create a new order
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function createOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:register_clients,id',
            'invitation_template_id' => 'required|exists:invitation_templates,id',
            'order_date' => 'required|date',
            'subdomain' => 'required|unique:orders,subdomain',
        ]);

        if ($validator->fails()) {
            $response = ApiResponse::error([
                'message' => $validator->errors(),
            ], 'Unprocessable Entity', 422);
        } elseif (!$request->user()) {
            $response = ApiResponse::error([
                'message' => 'Unauthenticated',
            ], 'Unauthenticated', 401);
        } elseif (!$this->useCaseClient->findById($request->client_id)) {
            $response = ApiResponse::error([
                'message' => 'Client not found',
            ], 'Client not found', 404);
        } elseif (!$this->useCaseTemplate->findById($request->invitation_template_id)) {
            $response = ApiResponse::error([
                'message' => 'Invitation template not found',
            ], 'Invitation template not found', 404);
        } else {
            $order = $this->useCaseCreateOrder->execute([
                'client_id' => $request->client_id,
                'invitation_template_id' => $request->invitation_template_id,
                'order_date' => $request->order_date,
                'subdomain' => $request->subdomain,
                'payment_status' => 'pending',
            ]);

            $response = ApiResponse::success([
                'message' => 'Order created successfully',
                'order' => $order
            ], 'Order created successfully', 201);
        }

        return $response;
    }



    /**
     * @OA\Get(
     *     path="/v1/orders/order-template",
     *     summary="Get all template order",
     *     tags={"Order"},
     *     security={{"bearer":{}}},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Search keyword",
     *         required=false
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Item per page",
     *         required=false
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order template list",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/OrderResource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function getAllTemplateOrder(Request $request)
    {
        $search = (string) $request->get('search', '');

        $perPage = (int) $request->get('per_page', 10);
        $perPage = $perPage > 100 ? 100 : $perPage;
        $templates = $this->useCaseGetTemplateOrder->execute($search, $perPage);
        return ApiResponse::success([
            'template' => $templates,
            'message' => 'Order template list'
        ], 'Order template list', 200);
    }

    /**
     * @OA\Get(
     *     path="/v1/orders/{id}",
     *     summary="Get order by id",
     *     tags={"Order"},
     *     security={{"bearer":{}}},
     *     @OA\Parameter(
     *         description="Id of order",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order detail",
     *         @OA\JsonContent(ref="#/components/schemas/OrderResource")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function show($id)
    {
        $order = $this->useCaseShowTemplateOrder->execute($id);

        if (!$order) {
            return ApiResponse::error([
                'message' => 'Order not found',
            ], 'Order not found', 404);
        }
        return ApiResponse::success([
            'order' => $order,
        ], 'Order detail', 200);
    }
}
