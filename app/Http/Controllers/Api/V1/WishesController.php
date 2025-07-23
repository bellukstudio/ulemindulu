<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Wishes\CreateWishApiUseCase;
use App\Application\Wishes\GetWishApiUseCase;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Order\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WishesController extends Controller
{

    protected $usecaseCreateWishes;
    protected $usecaseGetWishes;


    /**
     * @param CreateWishApiUseCase $usecaseCreateWishes
     * @param GetWishApiUseCase $usecaseGetWishes
     */
    public function __construct(CreateWishApiUseCase $usecaseCreateWishes, GetWishApiUseCase $usecaseGetWishes)
    {
        $this->usecaseCreateWishes = $usecaseCreateWishes;
        $this->usecaseGetWishes = $usecaseGetWishes;
    }


    /**
     * Get all wishes by slug
     *
     * @param string $slug
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllWishes($slug)
    {
        $order = Order::where('subdomain', $slug)->first();
        if (!$order) {
            return ApiResponse::error([
                'message' => 'Order not found',
            ], 'Data not found', 404);
        }

        $wishes = $this->usecaseGetWishes->execute($order->id, $order->invitation_template_id);
        return ApiResponse::success([
            'wishes' => $wishes,
            'message' => 'Wishes found',
        ], 'Wishes found', 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function postWishes(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:20',
            'present' => 'required|max:13',
            'saying' => 'required|max:100',
        ]);

        $order = Order::where('subdomain', $slug)->first();
        if (!$order) {
            return ApiResponse::error([
                'message' => 'Order not found',
            ], 'Data not found', 404);
        }

        if ($validator->fails()) {
            return ApiResponse::error([
                'message' => $validator->errors(),
            ], 'Validation failed', 422);
        }

        $data = [
            'order_id' => $order->id,
            'invitation_template_id' => $order->invitation_template_id,
            'name' => $request->name,
            'present' => $request->present,
            'saying' => $request->saying
        ];

        $this->usecaseCreateWishes->execute($data);
        return ApiResponse::success([
            'message' => 'Wish created successfully',
        ], 'Wish created successfully', 201);
    }
}
