<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User\RegisterClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
/**
 * Handle the registration of a new client.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\JsonResponse
 *
 * Validates the incoming request data and creates a new client record.
 * Generates a token for the newly registered client and returns a JSON
 * response with the registration status, token, and client details.
 * If validation fails, returns a JSON response with error messages.
 */

{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'clientName' => 'required|string|max:255',
            'email'      => 'required|string|email|unique:register_clients,email',
            'password'   => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $salt = env('PASSWORD_SALT');

        // Combine password with salt
        $saltedPassword = $request->password . $salt;

        $client = RegisterClient::create([
            'clientName' => $request->clientName,
            'email'      => $request->email,
            'password'   => bcrypt($saltedPassword),
        ]);

        $token = $client->createToken('client_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'token'   => $token,
            'client'  => $client,
        ], 201);
    }
}
