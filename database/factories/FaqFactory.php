<?php


use App\Models\Faq;
use Faker\Generator as Faker;

$factory->define(Faq::class, function (Faker $faker) {
    return [
        'title_ar' => $faker->name,
        'title_en' => $faker->name,
        'content_ar' => $faker->paragraph,
        'content_en' => $faker->paragraph,
    ];
});
