<?php

use App\Models\Slide;
use App\Models\User;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Slide::class, function (Faker $faker) use ($fakerAr) {
    return [
        'image' => env('APP_MODE') . '-slides-' . $faker->numberBetween(43, 49) . '.jpeg',
        'title_en' => $faker->name,
        'title_ar' => $faker->name,
        'caption_en' => $faker->name,
        'caption_ar' => $faker->name,
        'active' => $faker->boolean,
        'on_home' => $faker->boolean,
        'is_video' => $faker->boolean,
        'is_intro' => $faker->boolean,
        'url' => function ($array) use ($faker) {
            if ($array['is_video']) {
                return 'https://www.youtube.com/embed/KTkClkW0MZw';
            }
            return $faker->url;
        },
        'order' => $faker->numberBetween(1, 10),
        'slidable_type' => $faker->randomElement(['App\Models\User', 'App\Models\Category', 'App\Models\Product', 'App\Models\Service']),
        'slidable_id' => $faker->numberBetween(1, 99)
    ];
});
