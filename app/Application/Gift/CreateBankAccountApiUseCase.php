<?php

namespace App\Application\Gift;

use App\Domain\Gift\GiftInterface;

class CreateBankAccountApiUseCase
{
    private GiftInterface      $giftRepository;

    public function __construct(GiftInterface $giftRepository)
    {
        $this->giftRepository = $giftRepository;
    }

    public function execute($orderId, $invitationTemplateId, array $bankAccounts)
    {
        return $this->giftRepository->createBankApiAccounts($orderId, $invitationTemplateId, $bankAccounts);
    }
}
