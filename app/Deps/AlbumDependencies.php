<?php

namespace App\Deps;

use App\Application\Album\MyAlbumUseCase;

class AlbumDependencies
{

    /**
     * Constructs the AlbumDependencies.
     *
     * @param MyAlbumUseCase $album
     *   The MyAlbumUseCase.
     */
    public function __construct(
        public MyAlbumUseCase $album
    ) {}
}
