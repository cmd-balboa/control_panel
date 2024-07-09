<?php

namespace App\Http\Controllers\Api\Admin;

use App\Services\Admin\AdminService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAccountRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{

    protected $aion_ls;
    protected $adminService;

    public function __construct()
    {
        $this->aion_ls = DB::connection('aion_ls');
        $this->adminService = new AdminService;
    }

    public function getAllUsers(Request $request) {

        $users = DB::table('users')
            ->select('id', 'name', 'email', 'role', 'coin', 'created_at')
            ->get();

        $onlinePlayers = $this->adminService->getOnline();

        return response(compact('onlinePlayers', 'users'));

    }

    public function getAdvancedInfo(Request $request) {
        
        $combineAccountData = $this->adminService->getFullAccount($request->name);

        // Log::info($combineAccountData);
        return response(compact('combineAccountData'));

    }

    public function updateAccount(UpdateAccountRequest $request) {
        $data = $request->validated();

        //$this->adminService->updateAccount($data);

        Log::info($data);

    }
}
