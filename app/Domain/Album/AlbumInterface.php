<?php

namespace App\Domain\Album;

use App\Models\Invitation\AlbumPhoto;

interface AlbumInterface
{
    public function countByOrderId(string $orderId): int;
    public function createAlbum(array $data);
    public function findById(string $albumId): AlbumPhoto;
    public function getKeyByOrderId(string $orderId, array $orderedIds);
    public function getMyAlbum(string $orderId);
    public function upsertAlbum(array $valueData, array $uniqueBy, array $updateColumns);
    public function getAlbumByOrderId(string $orderId);
}
