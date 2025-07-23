<?php


namespace App\Application\Wishes;

use App\Domain\Wishes\WishesInterface;

class GetWishApiUseCase
{

    private WishesInterface $wishesInterface;

    public function __construct(WishesInterface $wishesInterface)
    {
        $this->wishesInterface = $wishesInterface;
    }


    public function execute($orderId, $templateId)
    {
        return $this->wishesInterface->getWishes($orderId, $templateId);
    }
}
