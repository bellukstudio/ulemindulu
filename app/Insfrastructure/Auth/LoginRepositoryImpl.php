<?php

namespace App\Insfrastructure\Auth;

use App\Domain\Auth\AuthInterface;
use App\Models\User\RegisterClient;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginRepositoryImpl implements AuthInterface
{

    public function login(string $email, string $password): bool
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            session()->regenerate();
            return true;
        }
        return false;
    }

    public  function loginApi(string $email)
    {
        return RegisterClient::where('email', $email)->first();
    }

    public function registerApi(array $data)
    {
        
        return RegisterClient::create($data);
    }
}
