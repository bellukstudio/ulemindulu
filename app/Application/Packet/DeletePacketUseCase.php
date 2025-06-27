<?php

namespace App\Application\Packet;

use App\Domain\Packet\PacketInterface;
use App\Models\Packet\Packet;

class DeletePacketUseCase
{
    private PacketInterface $packetInterface;

    public function __construct(PacketInterface $packetInterface)
    {
        $this->packetInterface = $packetInterface;
    }

    public function execute(Packet $packet) : bool
    {
        return $this->packetInterface->delete($packet);

    }
}
