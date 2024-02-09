<?php

namespace App\Rules;

use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Validation\ValidationRule;
use Closure;
use Illuminate\Support\Facades\DB;

class UniqueAionNameRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void {

        $existsInDatabase = DB::connection('aiondb')
            ->table('account_data')
            ->where('name', $value)
            ->exists();

        if($existsInDatabase){
            $fail('This name is already taken in aion');
        }
    }

}
