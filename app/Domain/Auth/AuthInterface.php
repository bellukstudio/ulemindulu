<?php

namespace App\Domain\Auth;

interface AuthInterface
{
    public function login(string $email, string $password) : bool;
    public function registerApi(array $data);
    public function loginApi(string $email);
}
