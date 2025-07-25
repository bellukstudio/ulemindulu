<?php

namespace App\Domain\Client;

interface ClientInterface
{
    public function getAll($search): mixed;
}
