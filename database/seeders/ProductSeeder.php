<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{

    public function run()
    {
        $faker = Faker::create();
        for ($i = 1; $i <= 15; $i++) {
            Product::create([
                'title' => $faker->word . $i,
                'category' => "Category $i",
                'icon' => $faker->imageUrl,
                'desc' => $faker->paragraph,
                'price' => rand(10, 100),
                'vip' => 0,
                'day' => 0,
            ]);
        }


        Product::create([
            'title' => "VIP ACCOUNT 1 DAY",
            'category' => "VIP",
            'icon' => "https://pichold.ru/wp-content/uploads/2021/09/23.png",
            'desc' => "VIP exp x2, drop x2",
            'price' => 100,
            'vip' => 1,
            'day' => 1,
        ]);
        Product::create([
            'title' => "VIP ACCOUNT 7 DAY",
            'category' => "VIP",
            'icon' => "https://cdn-icons-png.flaticon.com/512/879/879066.png",
            'desc' => "VIP exp x2, drop x2",
            'price' => 200,
            'vip' => 1,
            'day' => 7,
        ]);
        Product::create([
            'title' => "VIP ACCOUNT 14 DAY",
            'category' => "VIP",
            'icon' => "https://otkrit-ka.ru/uploads/posts/2021-10/foto-i-kartinki-s-nadpisju-vip-24.png",
            'desc' => "VIP exp x2, drop x2",
            'price' => 400,
            'vip' => 1,
            'day' => 14,
        ]);
        Product::create([
            'title' => "VIP ACCOUNT 30 DAY",
            'category' => "VIP",
            'icon' => "https://cdn0.iconfinder.com/data/icons/entertainment-gamification/1000/VIP-1024.png",
            'desc' => "VIP exp x2, drop x2",
            'price' => 700,
            'vip' => 1,
            'day' => 30,
        ]);
    }
}
