<?php

namespace App\Rules;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Validation\ValidationRule;
use Closure;

class CurrentPasswordMatchesRule implements ValidationRule
{

    public function validate(string $attribute, mixed $value, Closure $fail): void {

        $user = Auth::user();

        if (!$user) {
            $fail('Invalid user.');
            return;
        }

        if (!Hash::check($value, $user->password)) {
            $fail('The password must match the current user\'s password.');
        }

    }
}
