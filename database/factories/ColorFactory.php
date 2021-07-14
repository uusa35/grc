<?php

namespace Database\Factories;

use App\Models\Color;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class ColorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Color::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_en' => $this->faker->unique()->randomElement(['red', 'white', 'orange', 'green', 'none']),
            'name_ar' => function ($array) {
                return $array['name_en'];
            },
            'code' => $this->faker->hexColor
        ];
    }
}
