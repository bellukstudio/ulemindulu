<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Auth\RegisterApiUseCase;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
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


    protected $registerUseCase;

    /**
     * Injects the RegisterApiUseCase.
     *
     * @param  \App\Application\Auth\RegisterApiUseCase  $registerUseCase
     */
    public function __construct(RegisterApiUseCase $registerUseCase)
    {
        $this->registerUseCase = $registerUseCase;
    }


    /**
     * Handles the registration of a new client.
     *
     * Validates the incoming request data and creates a new client record.
     * Generates a token for the newly registered client and returns a JSON
     * response with the registration status, token, and client details.
     * If validation fails, returns a JSON response with error messages.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'clientName' => 'required|string|max:255',
            'email'      => 'required|string|email|unique:register_clients,email',
            'password'   => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error([
                'message' => $validator->errors(),
            ], 'Registration failed', 422);
        }
        $salt = env('PASSWORD_SALT');

        // Combine password with salt
        $saltedPassword = $request->password . $salt;

        $client = $this->registerUseCase->execute(
            [
                'clientName' => $request->clientName,
                'email'      => $request->email,
                'password'   => bcrypt($saltedPassword),
            ]
        );

        $token = $client->createToken('client_token')->plainTextToken;

        return ApiResponse::success([
            'message' => 'Registration successful',
            'token'   => $token,
            'client'  => $client,
        ], 'Registration successful', 201);
    }
}
