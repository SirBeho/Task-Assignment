<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConfigFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
            return [
            'range_level_min' => $this->faker->numberBetween(1, 5),
            'range_level_max' => $this->faker->numberBetween(6, 10),
            'work_queue' => $this->faker->word,
        ];
    }
}
