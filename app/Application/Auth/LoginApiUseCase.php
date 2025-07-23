<?php

namespace App\Application\Auth;

use App\Domain\Auth\AuthInterface;

class LoginApiUseCase
{
    private AuthInterface $authInterface;

    public function __construct(AuthInterface $authInterface)
    {
        $this->authInterface = $authInterface;
    }

    public function execute(string $email)
    {
        return $this->authInterface->loginApi($email);
    }
}
