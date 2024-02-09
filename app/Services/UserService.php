<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Repositories\UserRepository;

class UserService
{

    protected $userRepository;
    protected $AionDB;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->AionDB = DB::connection('aiondb');
    }

    public function getAccountInfo($name)
    {
        return $this->userRepository->accountInfo($name);
    }

    public function getPersons($name)
    {
        return $this->userRepository->persons($name);
    }

    public function changeUserPassword($request, $user)
    {
        $newPassword = $request['password'];

        $user->update([
            'password' => bcrypt($newPassword),
            'updated_password' => Carbon::now()->addHours(3)
        ]);

        $aion_pass = base64_encode(sha1($newPassword, true));

        $this->AionDB->table('account_data')->where('name', $user->name)
            ->update(['password' => $aion_pass]);

        return response()->json(['message' => 'Пароль успешно изменен'], 200);
    }

    public function changeUserEmail($data, $user)
    {

        $user->update([
            'email' => $data['email'],
            'updated_email' => Carbon::now()->addHours(3)
        ]);

        return response()->json(['message' => 'Почта успешно изменена'], 200);
    }

    public function movePerson($data, $user)
    {
        //  1197 1039 139 58 210010000 ELYOS
        //  463 2810 295 84 220010000 ASMODIANS

        $person = $this->userRepository->onePerson($data['id']);


        if ($person->online == 1) {
            return response()->json(['error' => 'person is online, please logout'], 200);
        }

        $currentTime = Carbon::now();

        $check_time = $currentTime->diffInMinutes(Carbon::parse($user->repair_date));

        $allowNextRepair = 40 - $check_time;

        if ($check_time < 40) {
            return response()->json(['error' => 'The repair is available in ' . $allowNextRepair . ' minutes, try again later'], 200);
        }

        switch ($person->race) {
            case 'ELYOS':
                $this->AionDB->table('players')->where('id', $data['id'])
                    ->update([
                        'x' => 1197,
                        'y' => 1039,
                        'z' => 139,
                        'heading' => 58,
                        'world_id' => 210010000
                    ]);
                break;
            case 'ASMODIANS':
                $this->AionDB->table('players')->where('id', $data['id'])
                    ->update([
                        'x' => 463,
                        'y' => 2810,
                        'z' => 295,
                        'heading' => 84,
                        'world_id' => 220010000
                    ]);
                break;
            default:
                break;
        }

        $user->update([
            'repair_date' => Carbon::now()
        ]);

        return response()->json(['success' => 'Successful repair of the person'], 200);
    }
}
