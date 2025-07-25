<?php

namespace App\Application\Album;

use App\Domain\Album\AlbumInterface;
use App\Models\Invitation\AlbumPhoto;

class MyAlbumUseCase
{
    private AlbumInterface  $albumInterface;


    public function __construct(AlbumInterface $albumInterface)
    {
        $this->albumInterface = $albumInterface;
    }


    public function countByOrderId(string $orderId): int
    {
        return $this->albumInterface->countByOrderId($orderId);
    }

    public function createAlbum(array $data): AlbumPhoto
    {
        return $this->albumInterface->createAlbum($data);
    }

    public function findById(string $albumId): AlbumPhoto
    {
        return $this->albumInterface->findById($albumId);
    }

    public function getKeyByOrderId(string $orderId, array $orderedIds)
    {
        return $this->albumInterface->getKeyByOrderId($orderId, $orderedIds);
    }

    public function getMyAlbum(string $orderId)
    {
        return $this->albumInterface->getMyAlbum($orderId);
    }

    public function upsertAlbum(array $valueData, array $uniqueBy, array $updateColumns)
    {
        return $this->albumInterface->upsertAlbum($valueData, $uniqueBy, $updateColumns);
    }

    public function getAlbumByOrderId(string $orderId)
    {
        return $this->albumInterface->getAlbumByOrderId($orderId);
    }

}
