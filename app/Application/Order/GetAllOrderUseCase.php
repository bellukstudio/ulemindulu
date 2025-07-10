<?php

namespace App\Application\Order;


use App\Domain\Order\OrderInterface;
use App\Models\Order\Order;

class GetAllOrderUseCase
{
    private OrderInterface $orderRepository;

    public function __construct(OrderInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function execute(string $search) : mixed
    {
        return $this->orderRepository->all($search);
    }
}
