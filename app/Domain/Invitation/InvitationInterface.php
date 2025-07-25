<?php

namespace  App\Domain\Invitation;

use App\Models\Invitation\InvitationSetting;
use Illuminate\Validation\Rules\In;

interface InvitationInterface
{
    public function createInvitation(array $data);
    public function updateInvitation(InvitationSetting $invitation, array $data);
    public function checkSettings($orderId);
    public function findById($invitationId) : InvitationSetting;
    public function getInvitationByOrderIdAndInvitationTemplateId($orderId, $invitationTemplateId);
}
