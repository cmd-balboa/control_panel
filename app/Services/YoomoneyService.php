<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Services\LogService;
use App\Models\PayLog;

class YoomoneyService
{
    protected $logService;

    public function __construct(LogService $logService)
    {
        $this->logService = $logService;
    }

    public function payment($request)
    {
        Log::info($request);

        $yooMoneySecret = env('YOOMONEY_SECRET');
        $sha1 = $this->yoomoneyHash($request, $yooMoneySecret);


        // test-notification
        // https://yoomoney.ru/transfer/myservices/http-notification
        if ($request->operation_id == "test-notification") {
            $this->handleTestPayment($request, $sha1);
            return;
        }

        // get user
        $user = User::where('id', $request->label)->first();

        if (!$user) {
            Log::info('Пользователь не найден: ' . $request->label);
            return;
        }

        $transactionData = [
            'sender' => $request->sender,
            'notification_type' => $request->notification_type,
            'account_id' => $user->id,
            'account_name' => $user->name,
            'withdraw_amount' => $request->withdraw_amount,
            'operation_label' => $request->operation_label,
            'operation_id' => $request->operation_id,
            'pay_system' => 'yoomoney',
        ];


        if ($sha1 == $request->sha1_hash) {

            if ($this->checkOperationId($request->operation_id)) {
                Log::info('Операция отменена. Зачисление уже произошло');
                return;
            }

            $user->increment('coin', $request->withdraw_amount);
            $user->save();

            $this->logService->payLog($transactionData);

            Log::info('Успешная оплата отправитель: ' . $user->name . ' / сумма: ' .  $request->withdraw_amount);
        } else {
            Log::info('bad hash!  Не успешная оплата');
        }
    }

    public function checkOperationId($id)
    {
        $exists = PayLog::where('operation_id', $id)->exists();

        return $exists;
    }

    public function yoomoneyHash($request, $secret_word)
    {

        $hash = $request->notification_type .
            '&' . $request->operation_id .
            '&' . $request->amount .
            '&' . $request->currency .
            '&' . $request->datetime .
            '&' . $request->sender .
            '&' . $request->codepro .
            '&' . $secret_word .
            '&' . $request->label;

        return hash("sha1", $hash);
    }

    public function handleTestPayment($request, $sha1)
    {
        if ($sha1 == $request->sha1_hash) {
            Log::info('Тестовая оплата: hash - ok');
        } else {
            Log::info('Тестовая оплата: hash - error');
        }
    }
}
