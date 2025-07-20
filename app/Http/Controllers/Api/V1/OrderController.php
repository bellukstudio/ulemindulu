<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Order\CreateOrderApiUseCase;
use App\Application\Order\GetAllTemplateOrderApiUseCase;
use App\Application\Order\ShowTemplateOrderApiUseCase;
use App\Http\Controllers\Controller;
use App\Models\Order\InvitationTemplate;
use App\Models\User\RegisterClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $useCaseCreateOrder;
    protected $useCaseGetTemplateOrder;
    protected $useCaseShowTemplateOrder;


    public function __construct(CreateOrderApiUseCase $createOrderApiUseCase, GetAllTemplateOrderApiUseCase $getAllTemplateOrderApiUseCase, ShowTemplateOrderApiUseCase $showTemplateOrderApiUseCase)
    {
        $this->useCaseCreateOrder = $createOrderApiUseCase;
        $this->useCaseGetTemplateOrder = $getAllTemplateOrderApiUseCase;
        $this->useCaseShowTemplateOrder = $showTemplateOrderApiUseCase;
    }

    /**
     * Create a new order.
     *
     * @bodyParam client_id int required The ID of the client.
     * @bodyParam invitation_template_id int required The ID of the invitation template.
     * @bodyParam order_date date required The date of the order.
     * @bodyParam subdomain string required The subdomain of the order.
     *
     * @response 201 {
     *   "message": "Order created successfully",
     * }
     *
     * @response 401 {
     *   "message": "Unauthenticated"
     * }
     *
     * @response 422 {
     *   "errors": {
     *     "client_id": [
     *       "The client id field is required."
     *     ],
     *     "invitation_template_id": [
     *       "The invitation template id field is required."
     *     ],
     *     "order_date": [
     *       "The order date field is required."
     *     ],
     *     "subdomain": [
     *       "The subdomain field is required."
     *     ]
     *   }
     * }
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
            $response = response()->json(['errors' => $validator->errors()], 422);
        } elseif (!$request->user()) {
            $response = response()->json(['message' => 'Unauthenticated'], 401);
        } elseif (!RegisterClient::find($request->client_id)) {
            $response = response()->json(['message' => 'Client not found'], 404);
        } elseif (!InvitationTemplate::find($request->invitation_template_id)) {
            $response = response()->json(['message' => 'Template not found'], 404);
        } else {
            $this->useCaseCreateOrder->execute([
                'client_id' => $request->client_id,
                'invitation_template_id' => $request->invitation_template_id,
                'order_date' => $request->order_date,
                'subdomain' => $request->subdomain,
            ]);

            $response = response()->json(['message' => 'Order created successfully'], 201);
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
        $search = $request->get('search', '');
        $perPage = (int) $request->get('per_page', 10);
        $perPage = $perPage > 100 ? 100 : $perPage;
        $templates = $this->useCaseGetTemplateOrder->execute($search, $perPage);
        return response()->json($templates);
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

        return response()->json($order);
    }
}
