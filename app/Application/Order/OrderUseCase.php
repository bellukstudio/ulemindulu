<?php

namespace App\Application\Order;

use App\Domain\Order\OrderInterface;
use App\Models\Order\Order;

class OrderUseCase
{
    private OrderInterface $orderInterface;

    public function __construct(OrderInterface $orderInterface)
    {
        $this->orderInterface = $orderInterface;
    }


    public function orderBySubDomain(string $subdomain) : Order
    {
        return $this->orderInterface->orderBySubDomain($subdomain);
    }

    public function findById($id) : Order
    {
        return $this->orderInterface->findById($id);
    }
}
