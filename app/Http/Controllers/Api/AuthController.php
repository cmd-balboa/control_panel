<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthAionService;

class AuthController extends Controller
{
    public function signup(SignupRequest $request, AuthAionService $aionService)
    {

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        // NOTE registration in the Aion
        $aion_pass = base64_encode(sha1($data['password'], true));
        $aionService->aionRegistration($data['name'], $aion_pass);

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
