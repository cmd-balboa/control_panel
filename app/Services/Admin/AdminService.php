<?php

namespace App\Services\Admin;

use App\Repositories\AdminRepository;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminService
{

    protected $aion_ls;
    protected $adminRepository;

    public function __construct()
    {
        $this->aion_ls = DB::connection('aion_ls');
        $this->adminRepository = new AdminRepository;
    }

    public function getOnline()
    {
        return $this->adminRepository->onlinePlayers();
    }

    public function getFullAccount($name)
    {
        return $this->adminRepository->accountData($name);
    }

    public function updateAccount($data)
    {
        return '';
    }

    
}
