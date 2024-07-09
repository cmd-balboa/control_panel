<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\YoomoneyService;

class PaymentController extends Controller
{

    public function umoney(Request $request, YoomoneyService $yoomoneyService)
    {
        $yoomoneyService->payment($request);
    }

}
