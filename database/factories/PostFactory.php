<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Post;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'name_ar' => $faker->name,
        'name_en' => $faker->name,
        'name_ar' => $faker->sentence,
        'name_en' => $faker->name,
        'caption_ar' => $faker->sentence,
        'caption_en' => $faker->name,
        'image' => 'square.png',
        'description_ar' => $faker->paragraph,
        'description_en' => $faker->paragraph,
        'order' => $faker->numberBetween(1, 10),
        'active' => $faker->boolean,
        'user_id' => User::active()->get()->random()->id,
        'video_url' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_id' => 'KTkClkW0MZw',
        'keywords' => $faker->sentence,
        'views' => $faker->randomNumber(),
    ];
});
