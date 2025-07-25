<?php

namespace App\Domain\Payment;


interface PaymentInterface
{
    public function updatePaymentStatus(string $orderId, string $status);
    public function updateSnapToken(string $orderId, string $snapToken);
    
}
