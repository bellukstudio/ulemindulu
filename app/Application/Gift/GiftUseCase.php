<?php

namespace App\Application\Gift;

use App\Domain\Gift\GiftInterface;
use App\Models\Invitation\BankAccount;

class GiftUseCase
{
    private GiftInterface $giftInterface;

    public function __construct(GiftInterface $giftInterface)
    {
        $this->giftInterface = $giftInterface;
    }

    public function deleteBankAccount($orderId, $invitationTemplateId) : BankAccount
    {
        return $this->giftInterface->deleteBankAccount($orderId, $invitationTemplateId);
    }

    public function countBankAccount($orderId, $invitationTemplateId) : int
    {
        return $this->giftInterface->countBankAccount($orderId, $invitationTemplateId);
    }
}
