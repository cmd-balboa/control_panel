<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Services\LogService;

class ShugoShopService
{

    protected $AionDB;
    protected $logService;

    public function __construct()
    {
        $this->AionDB = DB::connection('aiondb');
        $this->logService = new LogService;
    }

    public function giveProduct(array $data){

        Log::info(json_encode($data));

        // validate
        if (!isset($data['personId'])) {
            return 'Выберите персонажа!';
        }
        if(!$data['product']->active) {
            return 'Выбран неактивный продукт';
        }
        if($data['user']->coin < ($data['product']->price * $data['lot'])) {
            return 'Недостаточно WP';
        }

        // give item


        // calc coin
        $calcCoinAfterBuy = $data['user']->coin - ($data['product']->price * $data['lot']);

        $data['user']->update([
            'coin' => $calcCoinAfterBuy,
        ]);

        // log table
        $this->logService->productLogs($data);

        return "успешная покупка!";
    }

}
