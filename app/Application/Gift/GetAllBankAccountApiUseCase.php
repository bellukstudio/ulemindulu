<?php

namespace App\Application\Gift;

use App\Domain\Gift\GiftInterface;

class GetAllBankAccountApiUseCase
{
    private GiftInterface $giftRepository;

    public function __construct(GiftInterface $giftRepository)
    {
        $this->giftRepository = $giftRepository;
    }

    public function execute($orderId, $invitationTemplateId)
    {
        return $this->giftRepository->getBankAccountApi($orderId, $invitationTemplateId);
    }
}
