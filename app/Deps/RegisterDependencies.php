<?php

namespace App\Deps;

use App\Application\Auth\RegisterApiUseCase;

class RegisterDependencies
{

    /**
     * Constructor for RegisterDependencies.
     *
     * @param RegisterApiUseCase $registerUseCase
     */
    public function __construct(
        public RegisterApiUseCase $registerUseCase
    ) {}
}
