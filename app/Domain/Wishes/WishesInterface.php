<?php

namespace App\Domain\Wishes;

interface WishesInterface
{
    public function getWishes($orderId, $templateId);
    public function postWishes(array $data);
}
