<?php

namespace App\Insfrastructure\Packet;

use App\Domain\Packet\PacketInterface;
use App\Models\Packet\Packet;

class PacketRepositoryImpl implements PacketInterface
{

    public function all(string $search): mixed
    {
        $query = Packet::query();

        if (!empty(trim($search))) {
            $query->where(function ($q) use ($search) {
                $q->where('packetName', 'LIKE', '%' . $search . '%')
                    ->orWhere('feature', 'LIKE', '%' . $search . '%');
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }

    public function create(array $data): Packet
    {
        return Packet::create($data);
    }

    public function update(Packet $packet, array $data): bool
    {
        return $packet->update($data);
    }

    public function delete(Packet $packet): bool
    {
        return $packet->delete();
    }
}
