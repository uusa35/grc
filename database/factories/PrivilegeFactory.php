<?php

use App\Models\Privilege;
use Faker\Generator as Faker;

$factory->define(Privilege::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'name_ar' => $faker->name,
        'name_en' => $faker->name,
        'description_ar' => $faker->name,
        'description_en' => $faker->name,
    ];
});
