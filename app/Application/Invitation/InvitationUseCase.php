<?php

namespace App\Application\Invitation;

use App\Domain\Invitation\InvitationInterface;
use App\Models\Invitation\InvitationSetting;

class InvitationUseCase
{
    private InvitationInterface $invitationRepository;

    public function __construct(InvitationInterface $invitationRepository)
    {
        $this->invitationRepository = $invitationRepository;
    }

    public function findById($invitationId) : InvitationSetting
    {
        return $this->invitationRepository->findById($invitationId);
    }

    public function getInvitationByOrderIdAndInvitationTemplateId($orderId, $invitationTemplateId)
    {
        return $this->invitationRepository->getInvitationByOrderIdAndInvitationTemplateId($orderId, $invitationTemplateId);
    }
}
