<?php

namespace App\Deps;

use App\Application\Gift\CheckBankAccountApiUseCase;
use App\Application\Gift\CreateBankAccountApiUseCase;
use App\Application\Gift\DeleteBankAccountApiUseCase;
use App\Application\Gift\GetAllBankAccountApiUseCase;
use App\Application\Gift\GiftUseCase;

class GiftDependencies
{

    /**
     * @param CreateBankAccountApiUseCase $useCaseCreateBankAccount
     * @param GetAllBankAccountApiUseCase $useCaseGetBankAccount
     * @param DeleteBankAccountApiUseCase $useCaseDeleteBankAccount
     * @param CheckBankAccountApiUseCase $useCaseCheckBankAccount
     * @param GiftUseCase $usecaseGift
     */
    public function __construct(
        public CreateBankAccountApiUseCase $useCaseCreateBankAccount,
        public GetAllBankAccountApiUseCase $useCaseGetBankAccount,
        public DeleteBankAccountApiUseCase $useCaseDeleteBankAccount,
        public CheckBankAccountApiUseCase $useCaseCheckBankAccount,
        public GiftUseCase $usecaseGift
    ) {}
}
