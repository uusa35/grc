<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Notification;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'title' => $this->faker->name,
            'description' => $this->faker->name,
            'type' => class_basename(Product::class),
            'file' => '01.pdf',
            'url' => $this->faker->imageUrl(),
            'image' => 'sample.png',
            'notificationable_id' => $this->faker->numberBetween(1, 50),
            'notificationable_type' => Product::class,
        ];
    }
}
