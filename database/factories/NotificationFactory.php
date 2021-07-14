<?php

use App\Models\Notification;
use App\Models\Product;
use App\Models\Project;
use Faker\Generator as Faker;

$factory->define(Notification::class, function (Faker $faker) {
    return [
        'title' => $faker->name,
        'description' => $faker->name,
        'type' => class_basename(Product::class),
        'path' => '1.pdf',
        'url' => $faker->imageUrl(),
        'image' => $faker->numberBetween(1, 10) . '.jpeg',
        'notificationable_id' => $faker->numberBetween(1,50),
        'notificationable_type' => Product::class,
    ];
});
