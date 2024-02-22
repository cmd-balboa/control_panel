<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateEmailRequest;
use App\Http\Requests\RepairPersonRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function getUser(Request $request)
    {
        $user = $request->user();
        $account = $this->userService->getAccountInfo($user->name);
        $persons = $this->userService->getPersons($user->name);

        $purchasedLog = $this->userService->getPurchasedLog($user->name);
        $connectionVipLog = $this->userService->getConnectionVipLog($user->name);
        $accessLog = $this->userService->getAccessLog($user->name);

        return response(compact('user', 'account', 'persons', 'purchasedLog', 'accessLog', 'connectionVipLog'));
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {

        $data = $request->validated();

        return $this->userService->changeUserPassword($data, $request->user());
    }

    public function updateEmail(UpdateEmailRequest $request)
    {
        $data = $request->validated();

        return $this->userService->changeUserEmail($data, $request->user());
    }


    public function repairPerson(RepairPersonRequest $request)
    {
        $data = $request->validated();

        return $this->userService->movePerson($data, $request->user());
    }
}
