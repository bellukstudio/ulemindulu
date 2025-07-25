<?php

namespace App\Domain\Client;

use App\Models\User\RegisterClient;

interface ClientInterface
{
    public function getAll($search): mixed;
    public function findById($id): RegisterClient;
}
