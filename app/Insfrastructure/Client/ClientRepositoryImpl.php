<?php

namespace App\Insfrastructure\Client;

use App\Domain\Client\ClientInterface;
use App\Models\User\RegisterClient;

class ClientRepositoryImpl implements ClientInterface
{
    public function getAll($search): mixed
    {
        $client = RegisterClient::query();

        if (!empty(trim($search))) {
            $client->search($search);
        }

        return $client->orderBy('created_at', 'desc')->paginate(10);
    }

    public function findById($id): RegisterClient
    {
        return RegisterClient::find($id);
    }
}
