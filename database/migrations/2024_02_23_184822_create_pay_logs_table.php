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
        Schema::create('pay_logs', function (Blueprint $table) {
            $table->id();
            $table->string('notification_type')->nullable();
            $table->string('account_id')->nullable();
            $table->string('account_name')->nullable();
            $table->double('withdraw_amount')->default(0);
            $table->string('operation_label')->nullable();
            $table->string('operation_id')->nullable();
            $table->string('pay_system')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pay_logs');
    }
};
