<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::findOrCreate('Owner', 'web');
        Role::findOrCreate('School Admin', 'web');
        Role::findOrCreate('Principal', 'web');
        Role::findOrCreate('Bursar', 'web');
        Role::findOrCreate('Teacher', 'web');
        Role::findOrCreate('Receptionist', 'web');
        Role::findOrCreate('Parent', 'web');
    }
}
