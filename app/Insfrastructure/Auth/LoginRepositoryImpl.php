<?php

namespace App\Insfrastructure\Auth;

use App\Domain\Auth\LoginInterface;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginRepositoryImpl implements LoginInterface
{

    public function login(string $email, string $password): bool
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            session()->regenerate();
            return true;
        }
        return false;
    }
}
