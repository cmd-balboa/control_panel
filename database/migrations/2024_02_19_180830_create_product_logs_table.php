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
        Schema::create('product_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->string('account_name');
            $table->string('character_name')->nullable();
            $table->string('ip')->nullable();
            $table->string('title')->nullable();
            $table->string('category')->nullable();
            $table->string('icon')->nullable();
            $table->text('desc')->nullable();
            $table->integer('price')->default(0);
            $table->integer('vip')->default(0);
            $table->integer('day')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_logs');
    }
};
