<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use Illuminate\Auth\AuthenticationException;


use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('frontend');
    }


    protected function unauthenticated($request, array $guards)
    {
        // Always return JSON response for unauthenticated API requests
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['message' => 'Unauthenticated or token invalid.'], 401);
        }

        // Remove the redirect attempt entirely for API-only applications
        return response()->json(['message' => 'Unauthenticated or token invalid.'], 401);
    }
}
