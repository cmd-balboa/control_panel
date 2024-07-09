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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('item_code')->nullable();
            $table->string('category')->nullable();
            $table->string('icon')->nullable();
            $table->string('lable')->nullable();
            $table->text('desc')->nullable();
            $table->integer('price');
            $table->integer('discount')->default(0);
            $table->integer('islot')->default(0);
            $table->integer('priority')->default(0);
            $table->integer('vip')->default(0);
            $table->integer('day')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
