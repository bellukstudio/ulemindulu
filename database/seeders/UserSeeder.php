<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $salt = env('PASSWORD_SALT');
        $users = [
            [
                'name' => 'Admin',
                'email' => 'masbro.ulemindulu.my.id',
                'password' =>  Hash::make('masukindulubro'.$salt),
                'role' => 'superadmin',
            ]
        ];

        foreach($users as $user){
            User::create($user);
        }
    }
}
