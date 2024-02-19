<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\PaymentUmoneyRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Post;

class PaymentController extends Controller
{
    public function umoney(Request $request)
    {

        Log::info("\n Новый запрос");
        Log::info($request);
        Log::info("\n");
        
        $hash = $_POST['notification_type'].
        '&'.$_POST['operation_id'].
        '&'.$_POST['amount'].
        '&'.$_POST['currency'].
        '&'.$_POST['datetime'].
        '&'.$_POST['sender'].
        '&'.$_POST['codepro'].
        '&'.'yn9X34O+7bJ5wnY9WNkvjtp5'.
        '&'.$_POST['label'];
        
        Log::info($hash);

        $sha1 = hash("sha1", $hash);


        if($sha1 == $_POST['sha1_hash'] ){
            Log::info(' Hash - OK ! Успешная оплата отправитель: '. $_POST['label'] . ' / сумма: ' .  $_POST['amount']);
        }else{
            Log::info('bad hash!  Не успешная оплата');
        }
    }
}
