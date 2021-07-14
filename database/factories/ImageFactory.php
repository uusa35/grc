<?php

use App\Models\Image;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Image::class, function (Faker $faker) use ($fakerAr) {
    return [
        'imagable_id' => $faker->numberBetween(1, 60),
        'imagable_type' => $faker->randomElement(['App\Models\User', 'App\Models\Category', 'App\Models\Product', 'App\Models\Service']),
        'image' => 'square.png',
        'caption_en' => $faker->word,
        'caption_ar' => $fakerAr->realText(50),
        'keywords' => $faker->sentence,
        'name_ar' => $faker->sentence,
        'name_en' => $faker->realText(20),
        'notes' => $faker->sentence,
        'order' => $faker->numberBetween(1, 10),
    ];
});
