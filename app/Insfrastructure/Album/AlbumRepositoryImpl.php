<?php

namespace App\Insfrastructure\Album;

use App\Domain\Album\AlbumInterface;
use App\Models\Invitation\AlbumPhoto;

class AlbumRepositoryImpl implements AlbumInterface
{
    public function countByOrderId(string $orderId): int
    {
        return AlbumPhoto::where('order_id', $orderId)->count();
    }

    public function createAlbum(array $data): AlbumPhoto
    {
        return AlbumPhoto::create($data);
    }

    public function findById(string $albumId): AlbumPhoto
    {
        return AlbumPhoto::findOrFail($albumId);
    }

    public function getKeyByOrderId(string $orderId, array $orderedIds)
    {
        return AlbumPhoto::where('order_id', $orderId)
            ->whereIn('id', $orderedIds)
            ->get()
            ->keyBy('id');
    }

    public function getMyAlbum(string $orderId)
    {
        return AlbumPhoto::where('order_id', $orderId)
            ->select(['id', 'album_public_id', 'image_path', 'position', 'created_at'])
            ->orderBy('position')
            ->get();
    }

    public function upsertAlbum(array $valueData, array $uniqueBy, array $updateColumns)
    {
        return AlbumPhoto::upsert($valueData, $uniqueBy, $updateColumns);
    }

    public function getAlbumByOrderId(string $orderId)
    {
        return AlbumPhoto::where('order_id', $orderId)->get();
    }
}
