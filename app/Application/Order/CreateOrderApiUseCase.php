<?php
namespace App\Application\Order;

use App\Domain\Order\OrderInterface;
use App\Models\Order\Order;

class CreateOrderApiUseCase
{
    private OrderInterface $orderRepository;

    public function __construct(OrderInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function execute(array $data) : Order
    {
        return $this->orderRepository->create($data);
    }
}
