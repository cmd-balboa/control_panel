<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class VipService
{

    protected $AionDB;

    public function __construct()
    {
        $this->AionDB = DB::connection('aiondb');
    }

    public function vipConnection($user, $product) {

        if($user->coin < $product->price) {
            return 'Недостаточно wcoin';
        }

        $currentEndDateVipStatus = $this->AionDB->table('account_data')
                    ->where('name', $user->name)
                    ->value('expire');
        
        if ($currentEndDateVipStatus !== null) {

            $parseDate = Carbon::parse($currentEndDateVipStatus);
            $newEndDateVipStatus = $parseDate->addDays($product->day);

        }else {

            $newEndDateVipStatus = Carbon::now()->addDays($product->day);

        }

        Log::info($newEndDateVipStatus);
        $this->AionDB->table('account_data')->where('name', $user->name)
                    ->update([
                        'membership' => 2,
                        'expire' => $newEndDateVipStatus
                    ]);
        
        
        DB::table('product_logs')->insert([
            'product_id' => $product->id,
            'account_name' => $user->name,
            'title' => $product->title,
            'category' => $product->category,
            'icon' => $product->icon,
            'desc' => $product->desc,
            'price' => $product->price,
            'vip' => $product->vip,
            'day' => $product->day,
            'created_at' => Carbon::now(),
        ]);
        
        return "Успешное подключение";
    }
}
