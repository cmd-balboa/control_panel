<?php

namespace App\Repositories;

use App\Models\PayLog;
use Illuminate\Support\Facades\DB;

class UserRepository
{

    private $AionDB;

    public function __construct()
    {
        $this->AionDB = DB::connection('aiondb');
    }

    public function getCharacterLevel($experience)
    {
        $experienceLevels = [
            0, 400, 1433, 3820, 9054, 17655, 30978, 52010, 82982, 126069,
            182252, 260622, 360825, 490331, 649161, 844370, 1083010, 1401348, 1808605, 2314763, 2941885,
            3769249, 4811146, 6010190, 7532332, 9277718, 11295635, 13631717, 16239405, 19278541, 23152741,
            27575835, 32811189, 39097209, 47320754, 57799676, 70624354, 87541057, 106988749, 129785724, 157181274,
            189242180, 226903743, 267217392, 310023917, 355785195, 404793679, 456655645, 511653749, 570132067, 632238537,
            701555814, 776801815, 857060847, 941090922, 1037785479, 1149177971, 1276607277, 1420714961, 1584652470, 1823862398,
            2072728061, 2330407004, 2611518625, 3120086899, 3704648134
        ];

        $level = 0;
        foreach ($experienceLevels as $exp) {
            if ($experience >= $exp) {
                $level++;
            } else {
                break;
            }
        }

        return $level;
    }

    public function accountInfo($name)
    {

        $account = $this->AionDB->table('account_data')
            ->where('name', '=', $name)
            ->select('activated', 'membership', 'last_ip', 'expire_access_level', 'expire')
            ->first();

        return $account;
    }

    public function persons($name)
    {

        $persons = $this->AionDB->table('players')
            ->where('account_name', '=', $name)
            ->select('id', 'name', 'race', 'player_class', 'creation_date', 'deletion_date', 'last_online', 'online', 'exp')
            ->get();

        foreach ($persons as $person) {
            $person->level = $this->getCharacterLevel($person->exp);
        }

        return $persons;
    }

    // for repair
    public function onePerson($id)
    {

        $person = $this->AionDB->table('players')
            ->where('id', '=', $id)
            ->select('id', 'race', 'online')
            ->first();

        return $person;
    }

    public function purchasedLog($name)
    {

        $log = DB::table('product_logs')
            ->where('account_name', '=', $name)
            ->select('id', 'account_name', 'personName', 'title', 'price', 'lot', 'created_at')
            ->get();

        return $log;
    }
    public function connectionVipLog($name)
    {

        $log = DB::table('connect_vip_logs')
            ->where('account_name', '=', $name)
            ->select('id', 'account_name', 'title', 'price', 'created_at')
            ->get();

        return $log;
    }

    public function accessLog($name)
    {

        $log = DB::table('access_user_logs')
            ->where('account_name', '=', $name)
            ->select('id', 'account_name', 'email', 'ip')
            ->get();

        return $log;
    }

    public function yooumoneyPayLog($name)
    {
        $log = PayLog::select('id', 'account_name', 'withdraw_amount', 'created_at')
            ->where('account_name', $name)
            ->get();

        return $log;
    }
}
