<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class OwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $user = User::firstOrCreate(
            ['username' => 'owner'],
            [
                'name' => 'Platform Owner',
                'password' => Hash::make('password'),
                'must_change_password' => false,
            ]
        );

        $user->assignRole('Owner');
    }
}
