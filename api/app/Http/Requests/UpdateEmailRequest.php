<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CurrentEmailMatchesRule;
use App\Rules\CurrentPasswordMatchesRule;

class UpdateEmailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_email' => ['required', 'email', new CurrentEmailMatchesRule],
            'email' => 'required|different:current_email|email',
            'password_confirm_email' => ['required', new CurrentPasswordMatchesRule]
        ];
    }
}
