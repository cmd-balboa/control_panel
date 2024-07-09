<?php

namespace App\Repositories;

use App\Models\PayLog;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AdminRepository
{

    private $aion_ls;
    private $aion_gs;

    public function __construct()
    {
        $this->aion_ls = DB::connection('aion_ls');
        $this->aion_gs = DB::connection('aion_gs');
    }

    public function onlinePlayers()
    {

        $players = $this->aion_gs->table('players')
            ->where('online', '=', 1)
            ->select('id', 'name', 'account_id', 'account_name', 'race')
            ->get();

        return $players;
    }


    public function accountData($name)
    {
        $user = DB::table('users')
            ->select('id', 'name', 'email', 'role', 'coin', 'created_at')
            ->where('name', $name)
            ->first();

        // Получаем данные аккаунтов из другой таблицы (или базы данных)
        $accountData = $this->aion_ls->table('account_data')
            ->select('id', 'name', 'activated', 'access_level', 'membership', 'expire')
            ->where('name', $name)
            ->first();

        if ($user && $accountData) {
            $combinedData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'coin' => $user->coin,
                'created_at' => $user->created_at,
                'activated' => $accountData->activated,
                'account_id' => $accountData->id,
                'access_level' => $accountData->access_level,
                'membership' => $accountData->membership,
                'expire' => $accountData->expire,
            ];
        } else {
            $combinedData = null;
        }

        return $combinedData;
    }
}
