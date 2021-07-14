<?php

namespace Database\Factories;

use App\Models\Size;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class SizeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Size::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_en' => $this->faker->unique()->randomElement(['small', 'x-small', 'xx-small', 'large', 'x-large', 'xx-large', 'xxx-large', 'medium', 'none']),
            'name_ar' => function ($array) {
                return $array['name_en'];
            }
        ];
    }
}
