<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Repositories\UserRepository;

class UserService
{

    protected $userRepository;
    protected $AionDB;

    public function __construct(UserRepository $userRepository){
        $this->userRepository = $userRepository;
        $this->AionDB = DB::connection('aiondb');
    }

    public function getAccountInfo($request){
        
        // try {
            if ($request->user()) {
                $user = $request->user();
                $account = $this->userRepository->accountInfo($request);
            } else {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        // } catch (\PDOException $e) {
        //     return response()->json(['message' => 'Database connection error'], 500);
        // }
        
        return response(compact('user', 'account'));


    }

    public function changeUserPassword($request, $user)
    {
        $newPassword = $request['password'];

        $user->update([
            'password' => bcrypt($newPassword),
            'updated_password' => Carbon::now()->addHours(3)
        ]);

        $aion_pass = base64_encode(sha1($newPassword, true));

        $this->AionDB->table('account_data')->where('name', 'bob2')
            ->update(['password' => $aion_pass]);

        return response()->json(['message' => 'Пароль успешно изменен'], 200);
    }

    public function changeUserEmail($request, $user)
    {

        $email = $request->input('email');

        $user->update([
            'email' => $email,
            'updated_email' => Carbon::now()->addHours(3)
        ]);

        return response()->json(['message' => 'Почта успешно изменена'], 200);
    }
}
