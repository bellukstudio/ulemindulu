<?php

namespace App\Application\Packet;

use App\Domain\Packet\PacketInterface;
use App\Models\Packet\Packet;

class UpdatePacketUseCase
{
    private PacketInterface $packetInterface;

    public function __construct(PacketInterface $packetInterface)
    {
        $this->packetInterface = $packetInterface;
    }

    public function execute(Packet $packet, array $data) : bool
    {
        return $this->packetInterface->update($packet, $data);
    }
}
