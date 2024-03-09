<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Services\AuthAionService;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(AuthAionService $aionService): void
    {
        // php artisan db:seed --class=UsersTableSeeder

        $name = 'lvv';
        $password = '123';

        User::create([
            'name' => $name,
            'email' => 'lvv@yandex.ru',
            'password' => bcrypt($password),
            'role' => 'user',
            'kinah' => 0,
            'coin' => 0,
            'agreement' => true,
            'bonus' => 0,
            'updated_password' => Carbon::now(),
            'updated_email' => Carbon::now(),
            'repair_date' => Carbon::now(),
        ]);


        // registration in the Aion
        $aion_pass = base64_encode(sha1($password, true));
        $aionService->aionRegistration($name, $aion_pass);
    }
}
