<?php

use App\Models\Size;
use Faker\Generator as Faker;

$factory->define(Size::class, function (Faker $faker) {
    return [
        'name_en' => $faker->unique()->randomElement(['small', 'x-small', 'xx-small', 'large', 'x-large', 'xx-large', 'xxx-large', 'medium', 'none']),
        'name_ar' => function ($array) {
            return $array['name_en'];
        }
    ];
});
