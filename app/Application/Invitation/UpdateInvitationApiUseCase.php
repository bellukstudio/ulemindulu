<?php

namespace App\Application\Invitation;

use App\Domain\Invitation\InvitationInterface;
use App\Models\Invitation\InvitationSetting;

class UpdateInvitationApiUseCase
{

    private InvitationInterface $invitationRepository;

    public function __construct(InvitationInterface $invitationRepository)
    {
        $this->invitationRepository = $invitationRepository;
    }

    public function execute(InvitationSetting $invitation, array $data,)
    {
        return $this->invitationRepository->updateInvitation($invitation, $data);
    }
}
