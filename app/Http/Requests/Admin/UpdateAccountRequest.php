<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
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
        $userId = $this->input('id');
        
        return [
            'id' => 'required',
            'name' => 'required',
            'email' => ['required', 'email', 'string', Rule::unique('users')->ignore($userId)],
            'role' => 'required',
            'coin' => 'required',
            'activated' => 'required',
            'account_id' => 'required',
            'access_level' => 'required',
            'membership' => 'required',
        ];
    }
}
