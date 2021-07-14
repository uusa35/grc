<?php

use App\Models\Day;
use Faker\Generator as Faker;

$factory->define(Day::class, function (Faker $faker) {
    return [
        'day' => $faker->dayOfMonth,
        'day_name_ar' => $faker->dayOfMonth,
        'day_name_en' => $faker->dayOfMonth,
        'day_no' => $faker->numberBetween(0, 6)
    ];
});
