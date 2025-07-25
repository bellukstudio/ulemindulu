<?php

namespace App\Application\Client;
use App\Domain\Client\ClientInterface;

class GetAllClientUseCase
{
    private ClientInterface $client;

    public function __construct(ClientInterface $client)
    {
        $this->client = $client;
    }

    public function execute($search): mixed
    {
        return $this->client->getAll($search);
    }
}
