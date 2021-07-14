<?php

use App\Models\Role;
use Faker\Generator as Faker;

$factory->define(Role::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'slug_ar' => $faker->sentence,
        'slug_en' => $faker->sentence,
        'caption_ar' => $faker->sentence,
        'caption_en' => $faker->sentence,
        'is_admin' => $faker->boolean(false),
        'is_super' => $faker->boolean(false),
        'is_client' => $faker->boolean(false),
        'is_designer' => $faker->boolean(false),
        'is_company' => $faker->boolean(false),
        'is_celebrity' => $faker->boolean(false),
        'is_visible' => $faker->boolean(false),
        'is_driver' => $faker->boolean(false),
        'active' => $faker->boolean(true),
        'color' => $faker->colorName,
        'order' => $faker->numberBetween(1, 10),
        'image' => 'square.png',,
    ];
});
