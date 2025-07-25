<?php

namespace App\Deps;

use App\Application\Order\OrderUseCase;
use App\Application\Wishes\CreateWishApiUseCase;
use App\Application\Wishes\GetWishApiUseCase;

class WishesDependencies
{
    /**
     * Constructor for WishesDependencies.
     *
     * @param CreateWishApiUseCase $usecaseCreateWishes
     * @param GetWishApiUseCase $usecaseGetWishes
     * @param OrderUseCase $usecaseOrder
     */
    public function __construct(
        public CreateWishApiUseCase $usecaseCreateWishes,
        public GetWishApiUseCase $usecaseGetWishes,
        public OrderUseCase $usecaseOrder
    ) {}
}
