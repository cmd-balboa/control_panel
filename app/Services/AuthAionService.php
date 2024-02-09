<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class AuthAionService
{

    protected $AionDB;

    public function __construct()
    {
        $this->AionDB = DB::connection('aiondb');
    }

    public function aionRegistration($user, $aionPassword)
    {

        $this->AionDB->table('account_data')->insert([
            'name' => $user,
            'password' => $aionPassword,
            'activated' => 1,
            'access_level' => 0,
            'membership' => 0,
            'last_ip' => '0.0.0.0',
            'last_server' => -1,
        ]);
    }
}
