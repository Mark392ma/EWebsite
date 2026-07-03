<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FeeType;

class FeeTypeSeeder extends Seeder
{
    public function run(): void
    {
        $feeTypes = [
            [
                'name' => 'Tuition',
                'description' => 'Main teaching and learning fee charged every term',
                'frequency' => 'termly'
            ],
            [
                'name' => 'Registration/Admission',
                'description' => 'One-time fee paid by new students only',
                'frequency' => 'one-time'
            ],
            [
                'name' => 'Exam Fee',
                'description' => 'CATs, mid-term, end term and national exams',
                'frequency' => 'termly'
            ],
            [
                'name' => 'Activity Fee',
                'description' => 'Sports, clubs, drama, music and competitions',
                'frequency' => 'termly'
            ],
            [
                'name' => 'Computer/ICT Fee',
                'description' => 'Computer lab access and digital learning',
                'frequency' => 'termly'
            ],
            [
                'name' => 'Medical Fee',
                'description' => 'School clinic, first aid and NHIF contribution',
                'frequency' => 'yearly'
            ],
            [
                'name' => 'Development Fee',
                'description' => 'Building fund and school infrastructure projects',
                'frequency' => 'yearly'
            ],
            [
                'name' => 'Lunch/Feeding Fee',
                'description' => 'Daily lunch for day scholars',
                'frequency' => 'termly'
            ],
            [
                'name' => 'Boarding Fee',
                'description' => 'Accommodation, meals and supervision for boarders',
                'frequency' => 'termly'
            ],
            [
                'name' => 'Transport Fee',
                'description' => 'School bus/shuttle service',
                'frequency' => 'monthly'
            ]
        ];

        foreach($feeTypes as $type) {
            FeeType::create($type);
        }
    }
}
