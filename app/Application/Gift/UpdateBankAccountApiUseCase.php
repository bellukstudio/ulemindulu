<?php

namespace App\Application\Gift;

use App\Domain\Gift\GiftInterface;

class UpdateBankAccountApiUseCase
{
    private GiftInterface   $giftInterface;

    public function __construct(GiftInterface $giftInterface)
    {
        $this->giftInterface = $giftInterface;
    }

    public function execute($bankAccountId, array $data)
    {
        return $this->giftInterface->updateBankApiAccount($bankAccountId, $data);
    }
}
