<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Faq;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class FaqFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Faq::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $this->faker->name,
            'name_en' => $fakerAr->name,
            'description_ar' => $this->faker->paragraph,
            'description_en' => $fakerAr->name,
            'caption_ar' => $this->faker->paragraph,
            'caption_en' => $fakerAr->name,
            'notes_ar' => $this->faker->paragraph,
            'notes_en' => $fakerAr->name,
            'order' => $this->faker->numberBetween(1, 99),
        ];
    }
}
