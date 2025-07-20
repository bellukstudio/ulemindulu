<?php

namespace App\Application\Invitation;

use App\Domain\Invitation\InvitationInterface;

class CheckInvitationApiUseCase
{
    private InvitationInterface $invitationRepository;

    public function __construct(InvitationInterface $invitationRepository)
    {
        $this->invitationRepository = $invitationRepository;
    }

    public function execute($orderId)
    {
        return $this->invitationRepository->checkSettings($orderId);
    }
}
