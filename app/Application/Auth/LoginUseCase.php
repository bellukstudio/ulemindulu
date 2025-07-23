<?php

namespace App\Application\Auth;

use App\Domain\Auth\AuthInterface;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginUseCase
{
    private AuthInterface $authInterface;

    public function __construct(AuthInterface $authInterface)
    {
        $this->authInterface = $authInterface;
    }

    public function execute(array $credentials) : void
    {
        if(!$this->authInterface->login($credentials['email'], $credentials['password'])) {
            throw ValidationException::withMessages([
                'email' => ['The email credentials are incorrect.'],

            ]);
        }

        $user = Auth::user();
        session(['user' => $user]);
    }
}
