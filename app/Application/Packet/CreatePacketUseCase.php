<?php

namespace App\Application\Packet;

use App\Domain\Packet\PacketInterface;

class CreatePacketUseCase
{
        private PacketInterface $packetInterface;
        public function __construct(PacketInterface $packetInterface)
        {
            $this->packetInterface = $packetInterface;
        }

        public function execute(array $data) : void
        {
            $this->packetInterface->create($data);
        }
}
