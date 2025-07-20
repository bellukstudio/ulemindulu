<?php


namespace  App\Application\Gift;

use App\Domain\Gift\GiftInterface;

class DeleteBankAccountApiUseCase
{
    private GiftInterface   $giftInterface;

    public function __construct(GiftInterface $giftInterface)
    {
        $this->giftInterface = $giftInterface;
    }

    public function execute($bankAccountId)
    {
        return $this->giftInterface->deleteBankApiAccount($bankAccountId);
    }
}
