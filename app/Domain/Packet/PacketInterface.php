<?php

namespace App\Domain\Packet;

use App\Models\Packet\Packet;

interface PacketInterface
{
    public function all(string $search) : mixed;
    public function create(array $data): Packet;
    public function update(Packet $packet, array $data) : bool;
    public function delete(Packet $packet): bool;
}
