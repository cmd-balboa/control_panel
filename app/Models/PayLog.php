<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'notification_type',
        'account_id',
        'account_name',
        'withdraw_amount',
        'operation_label',
        'operation_id',
        'pay_system',
        'created_at',
    ];
}
