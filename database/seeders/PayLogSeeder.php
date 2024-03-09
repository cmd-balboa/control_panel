<?php

namespace Database\Seeders;

use App\Models\PayLog;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PayLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            PayLog::create([
                'sender' => "410015031204".$i,
                'notification_type' => "p2p-incoming",
                'account_id' => "15",
                'account_name' => 'yungdd',
                'withdraw_amount' => $i,
                'operation_label' => $i,
                'operation_id' => $i,
                'pay_system' => "seeders",
                'created_at' => Carbon::now()

            ]);
        }
    }
    
}
