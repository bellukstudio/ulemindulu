<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Insfrastructure\Order\OrderRepositoryImpl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $orderRepository;


    public function __construct(OrderRepositoryImpl $orderRepository)
    {
        $this->orderRepository = $orderRepository;
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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }


        $order = $this->orderRepository->create([
            'client_id' => $request->client_id,
            'invitation_template_id' => $request->invitation_template_id,
            'order_date' => $request->order_date,
            'subdomain' => $request->subdomain
        ]);

        return response()->json([
            'message' => 'Order created successfully',
        ], 201);
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
        $templates = $this->orderRepository->getAllTemplateOrder($search, $perPage);
        return response()->json($templates);
    }
}
