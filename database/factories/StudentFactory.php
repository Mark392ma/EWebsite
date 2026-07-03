<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'adm_no' => 'ADM'.fake()->unique()->numberBetween(1000, 9999),
            'first_name' => $this->faker->firstName(),
            'middle_name' => $this->faker->optional(0.7)->firstName(), // 70% chance to have middle name
            'last_name' => $this->faker->lastName(),
            'date_of_birth' => $this->faker->dateTimeBetween('-16 years', '-5 years')->format('Y-m-d'), // students age 12-18
            'gender' => $this->faker->randomElement(['male', 'female']),
            'email' => $this->faker->boolean() ? $this->faker->unique()->safeEmail(): null, // 80% have email
            'phone_number' => $this->faker->phoneNumber(),
            'address' => $this->faker->city(),
            'class_id' => $this->faker->numberBetween(12, 17), // creates class if none exists
            'stream_id' => $this->faker->numberBetween(12, 13), // creates stream if none exists
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
