<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class UserRepository{

    private $AionDB;

    public function __construct() {
        $this->AionDB = DB::connection('aiondb');
    }

    public function accountInfo($name){


        $account = $this->AionDB->table('account_data')
                ->where('name', '=', $name)
                ->select('activated', 'membership', 'last_ip', 'expire_access_level')
                ->first();
        
        return $account;

    }


}




