<?php

use App\Models\Country;
use App\Models\Governate;
use Faker\Generator as Faker;

$factory->define(Governate::class, function (Faker $faker) {
    return [
        'country_id' => Country::all()->random()->id,
        'name' => $faker->name,
        'slug_ar' => $faker->name,
        'slug_en' => $faker->name,
        'order' => $faker->numberBetween(1,10),
        'active' => $faker->boolean(true),
    ];
});
