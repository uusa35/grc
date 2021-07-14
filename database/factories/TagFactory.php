<?php

use App\Models\Product;
use App\Models\Tag;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Tag::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'slug_ar' => $faker->word,
        'slug_en' => $faker->word,
        'order' => $faker->numberBetween(1, 59),
        'image' => app()->isLocal() ? 'commercial-0'.$faker->numberBetween(1, 3).'.jpeg' : $faker->numberBetween(43, 49) . '.jpeg', // 800 x 225
    ];
});
