<?php

namespace Database\Factories;

use App\Models\FeeSetup;
use App\Models\FeeType;
use App\Models\FeeGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FeeSetup>
 */
class FeeSetupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fee_type_id' => FeeType::inRandomOrder()->first()->id ?? FeeType::factory(),
            'fee_group_id' => FeeGroup::inRandomOrder()->first()->id ?? FeeGroup::factory(),
            'amount' => $this->faker->numberBetween(5000, 21000),
            'due_date' => $this->faker->dateTimeBetween('now', '+3months')->format('Y-m-d'),
            'late_penalty' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
