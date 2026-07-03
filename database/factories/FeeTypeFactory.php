<?php

namespace Database\Factories;

use App\Models\FeeType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FeeType>
 */
class FeeTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Tuition', 'Transport', 'Meals', 'Activity', 'Project']),
            'description' => $this->faker->sentence(8),
            'frequency' => $this->faker->randomElement(['termly', 'monthly', 'yearly', 'one-time', 'weekly']),
        ];
    }
}
