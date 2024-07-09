<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('connect_vip_logs', function (Blueprint $table) {
            $table->id();
            $table->string('account_name');
            $table->integer('product_id');
            $table->string('title')->nullable();
            $table->integer('price')->default(0);
            $table->integer('discount')->default(0);
            $table->integer('vip')->default(0);
            $table->integer('day')->default(0);
            $table->string('lable')->nullable();
            $table->string('ip')->nullable();
            $table->string('category')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connect_vip_logs');
    }
};
