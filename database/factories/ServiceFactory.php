<?php

use App\Models\Service;
use App\Models\User;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Service::class, function (Faker $faker) use ($fakerAr) {
    return [
        'sku' => $faker->postcode,
        'name_ar' => 'خدمة ' . $faker->numberBetween(1,999),
        'name_en' => 'Service '. $faker->numberBetween(1,999),
        'on_sale' => $faker->boolean(true),
        'exclusive' => $faker->boolean(true),
        'on_home' => $faker->boolean(true),
        'on_new' => $faker->boolean(true),
        'duration' => $faker->numberBetween(1, 9),
        'individuals' => $faker->numberBetween(10, 40),
        'setup_time' => $faker->numberBetween(1, 9),
        'delivery_time' => $faker->numberBetween(1, 9),
        'price' => $faker->randomFloat(3, 10, 200),
        'sale_price' => function ($array) {
            return $array['price'] - rand(1, 5);
        },
        'description_en' => $faker->paragraph,
        'description_ar' => $fakerAr->realText(),
        'notes_ar' => $faker->paragraph,
        'notes_en' => $faker->paragraph,
        'keywords' => $faker->sentence,
        'image' => 'square.png',
        'video_url_one' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_two' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_three' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_four' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_five' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'is_hot_deal' => $faker->boolean(true),
        'start_sale' => $faker->dateTime('now'),
        'start_date' => $faker->dateTime('now'),
        'range' => $faker->numberBetween(1,6),
        'end_sale' => $faker->dateTimeBetween('now', '1 year'),
        'user_id' => User::all()->random()->id,
        'active' => $faker->boolean(true),
        'is_available' => $faker->boolean(true),
        'multi_booking' => $faker->boolean,
        'booking_limit' => $faker->numberBetween(1, 4),
        'views' => $faker->randomNumber(),
        'has_addons' => $faker->boolean(),
        'has_only_items' => $faker->boolean(),
        'force_original_price' => $faker->boolean(),
        'is_package' => $faker->boolean(),
    ];
});
