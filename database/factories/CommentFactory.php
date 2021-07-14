<?php

use App\Models\Comment;
use App\Models\Job;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'title' => $faker->name,
        'content' => $faker->name,
        'path' => '01.pdf',
        'commentable_id' => User::all()->random()->id,
        'commentable_type' => $faker->randomElement(['App\Models\User', 'App\Models\Product', 'App\Models\Service']),
        'active' => $faker->boolean(true),
        'viewed' => $faker->boolean,
        'likes' => $faker->numberBetween(1, 99),
        'user_id' => User::all()->random()->id
    ];
});
