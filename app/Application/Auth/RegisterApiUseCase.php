<?php

namespace   App\Application\Auth;

use App\Domain\Auth\AuthInterface;

class RegisterApiUseCase
{
    private AuthInterface $authInterface;


    public function __construct(AuthInterface $authInterface)
    {
        $this->authInterface = $authInterface;
    }


    public function execute(array $data)
    {
        return $this->authInterface->registerApi($data);
    }
}
