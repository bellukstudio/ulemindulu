<?php

namespace App\Application\Order;

use App\Domain\Order\OrderInterface;

class GetAllTemplateOrderApiUseCase
{
    private OrderInterface $orderRepository;
    public function __construct(OrderInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function execute(string $search, int $perPage)
    {
        return $this->orderRepository->getAllTemplateOrder($search, $perPage);
    }
}
