<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User\RegisterClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * Login a client
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    ///
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $client = RegisterClient::where('email', $request->email)->first();
        $salt = env('PASSWORD_SALT');

        // Combine password with salt
        $saltedPassword = $request->password . $salt;
        if (!$client || !Hash::check($saltedPassword, $client->password, [])) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $client->createToken('client_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'client'  => $client,
        ]);
    }

    /**
     * Logout a client
     *
     * Revoke the current access token
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $token = $request->user()->currentAccessToken();

        if (!$token) {
            return response()->json(['message' => 'No token found'], 400);
        }

        $token->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
