<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Services\LogService;

class VipService
{

    protected $AionDB;
    protected $logService;

    public function __construct()
    {
        $this->AionDB = DB::connection('aiondb');
        $this->logService = new LogService;
    }

    public function vipConnection($data) {

        $user = $data['user'];
        $product = $data['product'];
        
        // validate
        if($user->active) {
            return 'Выбран неактивный продукт';
        }
        if($user->coin < $product->price) {
            return 'Недостаточно WP';
        }

        // check vip status
        $currentEndDateVipStatus = $this->AionDB->table('account_data')
                    ->where('name', $user->name)
                    ->value('expire');
        
        if ($currentEndDateVipStatus !== null) {

            $parseDate = Carbon::parse($currentEndDateVipStatus);
            $newEndDateVipStatus = $parseDate->addDays($product->day);

        }else {
            $newEndDateVipStatus = Carbon::now()->addDays($product->day);
        }

        // connect vip status
        $this->AionDB->table('account_data')->where('name', $user->name)
                    ->update([
                        'membership' => 2,
                        'expire' => $newEndDateVipStatus
                    ]);
        
        // calc coin
        $calcCoinAfterBuy = $user->coin - $product->price;

        $user->update([
            'coin' => $calcCoinAfterBuy,
        ]);
        
        // log table
        $this->logService->connectVipLogs($data);

        return "Успешное подключение";
    }

}
