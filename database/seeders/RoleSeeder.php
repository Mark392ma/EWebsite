<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'Owner',
            'School Admin',
            'Principal',
            'Bursar',
            'Teacher',
            'Receptionist',
            'Parent',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate([
                'name' => $role,
                'guard_name' => 'web',
            ]);
        }

        $owner = Role::findByName('Owner');

        $owner->syncPermissions(
            Permission::all()
        );
    }
}