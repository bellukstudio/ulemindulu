<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureApiToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::guard('client')->user();
        dd($user);  

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Dapatkan token yang sedang aktif
        $currentAccessToken = $user->currentAccessToken();

        if (!$currentAccessToken) {
            return response()->json(['message' => 'No active token found.'], 401);
        }

        // Cek apakah token sudah expired (kalau kamu set `expires_at` di token)
        if ($currentAccessToken->expires_at && $currentAccessToken->expires_at->isPast()) {
            return response()->json(['message' => 'Token has expired.'], 401);
        }

        return response()->json(['message' => 'Unauthenticated.'], 401);
    }
}
