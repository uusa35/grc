<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Section::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'description_ar' => $this->faker->paragraph,
            'description_en' => $fakerAr->name,
            'image' => 'sample.png',
            'url_one' => $this->faker->url,
            'url_two' => $this->faker->url,
            'url_one_name' => $this->faker->name,
            'url_two_name' => $this->faker->name,
            'video_url' => $this->faker->name,
            'order' => $this->faker->randomDigit,
            'template_id' => Template::all()->random()->id,
            'sectionable_type' => $this->faker->randomElement(['App\Models\Page', 'App\Models\Service']),
            'sectionable_id' => $this->faker->numberBetween(1, 10)
        ];
    }
}
