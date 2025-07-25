<?php

namespace App\Deps;

use App\Application\Auth\LoginApiUseCase;

class LoginDependencies
{
    /**
     * Constructs a new instance of LoginDependencies.
     *
     * @param LoginApiUseCase $loginUseCase
     *   The LoginApiUseCase instance to be used for login operations.
     */

    public function __construct(
        public LoginApiUseCase $loginUseCase
    ) {}
}
