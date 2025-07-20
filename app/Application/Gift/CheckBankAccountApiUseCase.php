<?php

namespace App\Application\Gift;

use App\Domain\Gift\GiftInterface;

class CheckBankAccountApiUseCase
{
    private GiftInterface $giftInterface;

    public function __construct(GiftInterface $giftInterface)
    {
        $this->giftInterface = $giftInterface;
    }

    public function execute($orderId, $invitationTemplateId)
    {
        return $this->giftInterface->checkBankAccount($orderId, $invitationTemplateId);
    }
}
