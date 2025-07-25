<?php

namespace App\Http\Controllers\Api\V1;

use App\Deps\LoginDependencies;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    protected $loginUseCase;


    public function __construct(LoginDependencies $deps)
    {
        $this->loginUseCase = $deps->loginUseCase;
    }
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

        $client = $this->loginUseCase->execute($request->email);
        $salt = env('PASSWORD_SALT');

        // Combine password with salt
        $saltedPassword = $request->password . $salt;
        if (!$client || !Hash::check($saltedPassword, $client->password, [])) {
            return ApiResponse::error([
                'message' => 'The provided credentials are incorrect.'
            ], 'Login failed', 401);
        }

        $token = $client->createToken('client_token')->plainTextToken;

        return ApiResponse::success([
            'message' => 'Login successful',
            'token'   => $token,
            'client'  => $client
        ], 'Login successful', 200);
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
            return ApiResponse::error([
                'message' => 'Unauthenticated'

            ], 'Logout failed', 401);
        }

        $token = $request->user()->currentAccessToken();

        if (!$token) {
            return ApiResponse::error([
                'message' => 'Unauthenticated'
            ], 'Logout failed', 401);
        }

        $token->delete();

        return ApiResponse::success([
            'message' => 'Logout successful'
        ], 'Logout successful', 200);
    }
}
