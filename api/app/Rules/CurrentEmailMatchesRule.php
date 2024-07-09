<?php

namespace App\Rules;

use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Validation\ValidationRule;
use Closure;

class CurrentEmailMatchesRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void {

        $user = Auth::user();

        if (!$user) {
            $fail('Invalid user.');
            return;
        }

        if ($user->email !== $value) {
            $fail('The email must match the current user\'s email.');
        }

    }

}
