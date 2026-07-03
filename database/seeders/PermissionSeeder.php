<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [

            // Schools
            'view schools',
            'create schools',
            'edit schools',
            'delete schools',

            // Students
            'view students',
            'create students',
            'edit students',
            'delete students',

            // Finance
            'view finance',
            'create payments',
            'print receipts',

            // Reports
            'view reports',

        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}