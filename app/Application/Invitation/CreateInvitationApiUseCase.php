<?php


namespace   App\Application\Invitation;

use App\Domain\Invitation\InvitationInterface;

class CreateInvitationApiUseCase
{
    private InvitationInterface $invitationInterface;


    public function __construct(InvitationInterface $invitationInterface)
    {
        $this->invitationInterface = $invitationInterface;
    }

    public function execute(array $data)
    {
        return $this->invitationInterface->createInvitation($data);
    }
}
