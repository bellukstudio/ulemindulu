<?php

namespace App\Deps;

use App\Application\Album\MyAlbumUseCase;
use App\Application\Gift\GetAllBankAccountApiUseCase;
use App\Application\Invitation\CheckInvitationApiUseCase;
use App\Application\Invitation\CreateInvitationApiUseCase;
use App\Application\Invitation\InvitationUseCase;
use App\Application\Invitation\UpdateInvitationApiUseCase;
use App\Application\Order\OrderUseCase;

class InvitationDependencies
{
    /**
     * InvitationDependencies constructor.
     *
     * @param CreateInvitationApiUseCase $createInvitation
     * @param UpdateInvitationApiUseCase $updateInvitation
     * @param CheckInvitationApiUseCase $checkInvitation
     * @param GetAllBankAccountApiUseCase $getBankAccount
     * @param InvitationUseCase $invitation
     * @param OrderUseCase $order
     * @param MyAlbumUseCase $album
     */
    public function __construct(
        public CreateInvitationApiUseCase $createInvitation,
        public UpdateInvitationApiUseCase $updateInvitation,
        public CheckInvitationApiUseCase $checkInvitation,
        public GetAllBankAccountApiUseCase $getBankAccount,
        public InvitationUseCase $invitation,
        public OrderUseCase $order,
        public MyAlbumUseCase $album
    ) {}
}
