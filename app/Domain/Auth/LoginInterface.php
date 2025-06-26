<?php

namespace App\Domain\Auth;

interface LoginInterface
{
    public function login(string $email, string $password) : bool;
}
