<?php

use App\Models\Coupon;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Coupon::class, function (Faker $faker) {
    return [
        'value' => $faker->numberBetween(1, 10),
        'is_percentage' => $faker->boolean,
        'is_permanent' => $faker->boolean,
        'consumed' => $faker->boolean,
        'code' => $faker->numberBetween(999999, 99999999999),
        'minimum_charge' => $faker->randomDigit,
        'due_date' => $faker->dateTimeBetween('now', '1 year'),
        'active' => $faker->boolean(true),
        'user_id' => User::all()->random()->id
    ];
});
