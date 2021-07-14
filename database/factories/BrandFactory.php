<?php

use App\Models\Brand;
use App\Models\Country;
use App\Models\User;
use Faker\Generator as Faker;
$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Brand::class, function (Faker $faker)  use($fakerAr) {
    return [
        'name' => $faker->word,
        'slug_ar' => $faker->realText(30),
        'slug_en' => $faker->word,
        'image' => 'logo-0' . $faker->numberBetween(1, 8) . '.png',
        'on_home' => $faker->boolean,
        'order' => $faker->numberBetween(1,10),
        'active' => $faker->boolean(true),
    ];
});

