<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class AuthAionService
{

    protected $aion_ls;

    public function __construct()
    {
        $this->aion_ls = DB::connection('aion_ls');
    }

    public function aionRegistration($user, $aionPassword)
    {

         $accountId = $this->aion_ls->table('account_data')->insertGetId([
            'name' => $user,
            'password' => $aionPassword,
            'activated' => 1,
            'access_level' => 0,
            'membership' => 0,
            'last_ip' => '0.0.0.0',
            'last_server' => -1,
        ]);

        $this->aion_ls->table('account_time')->insert([
            'account_id' => $accountId,
        ]);
    }
}
