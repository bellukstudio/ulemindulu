<?php

namespace App\Application\Packet;

use App\Domain\Packet\PacketInterface;

class GetAllPacketUseCase
{
    private PacketInterface $packetInterface;

    public function __construct(PacketInterface $packetInterface)
    {
        $this->packetInterface = $packetInterface;
    }


    public function execute(string $search) : mixed
    {

        return $this->packetInterface->all($search);
    }

}
