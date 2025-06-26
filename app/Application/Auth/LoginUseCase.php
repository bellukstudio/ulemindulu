<?php

namespace App\Application\Auth;

use App\Domain\Auth\LoginInterface;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginUseCase
{
    private LoginInterface $loginInterface;

    public function __construct(LoginInterface $loginInterface)
    {
        $this->loginInterface = $loginInterface;
    }

    public function execute(array $credentials) : void
    {
        if(!$this->loginInterface->login($credentials['email'], $credentials['password'])) {
            throw ValidationException::withMessages([
                'email' => ['The email credentials are incorrect.'],

            ]);
        }

        $user = Auth::user();
        session(['user' => $user]);
    }
}
