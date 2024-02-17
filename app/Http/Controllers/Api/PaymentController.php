<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function umoney(Request $request)
    {
        $data = $request->validated();

        return response('ok');
    }
}
