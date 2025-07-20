<?php

namespace   App\Application\Order;

use App\Domain\Order\OrderInterface;


class ShowTemplateOrderApiUseCase
{

    private OrderInterface $orderRepository;

    public function __construct(OrderInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function execute($id)
    {
        return $this->orderRepository->showById($id);
    }
}
