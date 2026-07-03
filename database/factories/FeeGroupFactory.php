<?php

namespace Database\Factories;

use App\Models\FeeGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FeeGroup>
 */
class FeeGroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Term 1', 'Term 2', 'Term 3', 'Annual', 'Holiday']),
            'fee_type' => ['includes' => $this->faker->randomElements(['Tuition', 'Meals', 'transport'], 2),
            'description' => $this->faker->sentence(12),
            'optional' => $this->faker->boolean(30)
            ],
        ];
    }
}
