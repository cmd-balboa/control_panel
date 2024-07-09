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
            $table->string('account_name');
            $table->integer('product_id');
            $table->string('personId')->nullable();
            $table->string('personName')->nullable();
            $table->string('title')->nullable();
            $table->string('item_code')->nullable();
            $table->integer('price')->default(0);
            $table->integer('discount')->default(0);
            $table->integer('lot')->default(1);
            $table->string('ip')->nullable();
            $table->string('category')->nullable();
            $table->string('icon')->nullable();
            $table->string('lable')->nullable();
            $table->text('desc')->nullable();
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
