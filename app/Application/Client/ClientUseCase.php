<?php

namespace App\Application\Client;

use App\Domain\Client\ClientInterface;
use App\Models\User\RegisterClient;

class ClientUseCase
{

    private ClientInterface $client;

    public function __construct(ClientInterface $client)
    {
        $this->client = $client;
    }

    public function findById($id): RegisterClient
    {
        return $this->client->findById($id);
    }
}
