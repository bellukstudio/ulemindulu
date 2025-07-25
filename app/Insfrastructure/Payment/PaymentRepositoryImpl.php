<?php

namespace App\Insfrastructure\Payment;

use App\Domain\Payment\PaymentInterface;
use App\Models\Order\Order;

class PaymentRepositoryImpl implements PaymentInterface{

    public function updateSnapToken(string $orderId, string $snapToken)
    {
        return Order::where('id', $orderId)->update(['midtrans_order_id' => $snapToken]);
    }


    public function updatePaymentStatus(string $orderId, string $status)
    {
        return Order::where('id', $orderId)->update(['payment_status' => $status]);
    }
}
