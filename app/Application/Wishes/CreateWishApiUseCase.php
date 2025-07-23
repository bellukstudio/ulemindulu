<?php


namespace App\Application\Wishes;

use App\Domain\Wishes\WishesInterface;

class CreateWishApiUseCase
{

    private WishesInterface $wishesInterface;

    public function __construct(WishesInterface $wishesInterface)
    {
        $this->wishesInterface = $wishesInterface;
    }


    public function execute(array $data)
    {
        return $this->wishesInterface->postWishes($data);
    }
}
