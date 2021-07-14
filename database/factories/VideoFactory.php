<?php

use App\Models\Slide;
use App\Models\User;
use App\Models\Video;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Video::class, function (Faker $faker) use ($fakerAr) {
    return [
        'name_en' => $faker->name,
        'name_ar' => $faker->name,
        'caption_en' => $faker->name,
        'caption_ar' => $faker->name,
        'active' => $faker->boolean,
        'on_home' => $faker->boolean,
        'url' => 'https://www.youtube.com/embed/KTkClkW0MZw',
        'video_id' => 'KTkClkW0MZw',
        'image' => env('APP_MODE') . '-slides-' . $faker->numberBetween(43, 49) . '.jpeg',
        'order' => $faker->numberBetween(1, 10),
//        'videoable_type' => $faker->randomElement(['App\Models\User', 'App\Models\Category', 'App\Models\Product', 'App\Models\Service']),
//        'videoable_id' => $faker->numberBetween(1, 99)
    ];
});
