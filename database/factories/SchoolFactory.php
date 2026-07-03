<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<School>
 */
class SchoolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'name' => fake()->company(),

            'code' => fake()->unique()->lexify('???'),

            'email' => fake()->companyEmail(),

            'phone' => fake()->phoneNumber(),

            'address' => fake()->address(),

            'county' => 'Kilifi',

            'country' => 'Kenya',

            'active' => true,

        ];
    }
}