<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\School;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        School::firstOrCreate(
            ['code' => 'mtp'],
            [
                'name' => 'Mtwapa Primary School',
                'email' => 'info@mtp.test',
                'county' => 'Kilifi',
            ]
        );
    }
    
}
