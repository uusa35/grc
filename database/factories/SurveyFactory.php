<?php

use App\Models\Slide;
use App\Models\Survey;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Survey::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'slug_ar' => $faker->sentence,
        'slug_en' => $faker->sentence,
        'description_ar' => $faker->paragraph,
        'description_en' => $faker->paragraph,
        'is_home' => $faker->boolean,
        'is_desktop' => $faker->boolean,
        'is_footer' => $faker->boolean,
        'active' => $faker->boolean(true),
        'on_sale' => $faker->boolean,
        'is_order' => $faker->boolean,
//        'user_id' => User::designers()->get()->random()->id,
        'order' => $faker->numberBetween(1, 99),
        'price' => $faker->randomFloat(3, 10, 200),
        'net_price' => $faker->randomFloat(3, 10, 200),
    ];
});
