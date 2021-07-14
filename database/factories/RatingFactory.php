<?php

use App\Models\Favorite;
use App\Models\Product;
use App\Models\Rating;
use App\Models\User;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Rating::class, function (Faker $faker) {
    return [
        'user_id' => User::all()->random()->id,
        'member_id' => User::companies()->get()->shuffle()->first()->id,
        'value' => $faker->randomElement([20,40,60,80,100]),
    ];
});

