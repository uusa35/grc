<?php

use App\Models\Privilege;
use Faker\Generator as Faker;

$factory->define(Privilege::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'slug_ar' => $faker->name,
        'slug_en' => $faker->name,
        'description_ar' => $faker->name,
        'description_en' => $faker->name,
    ];
});
