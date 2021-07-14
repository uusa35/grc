<?php

use App\Models\Newsletter;
use Faker\Generator as Faker;

$factory->define(Newsletter::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'active' => $faker->boolean,
    ];
});
