<?php

namespace App\Insfrastructure\Invitation;

use App\Domain\Invitation\InvitationInterface;
use App\Models\Invitation\InvitationSetting;

class InvitationRepositoryImpl implements InvitationInterface
{
    public function createInvitation(array $data)
    {
        return InvitationSetting::create($data);
    }

    public function updateInvitation(InvitationSetting $invitation, array $data)
    {
        return $invitation->update($data);
    }

    public function checkSettings($orderId)
    {
        return InvitationSetting::where('order_id', $orderId)->first();
    }
}
