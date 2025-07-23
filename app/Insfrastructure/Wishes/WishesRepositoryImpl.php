<?php

namespace App\Insfrastructure\Wishes;

use App\Domain\Wishes\WishesInterface;
use App\Models\Wish\Wish;

class WishesRepositoryImpl implements WishesInterface
{

    public function getWishes($orderId, $templateId)
    {
        return Wish::where('order_id', $orderId)->where('invitation_template_id', $templateId)->get();
    }

    public function postWishes(array $data)
    {
        
        return Wish::create($data);
    }
}
