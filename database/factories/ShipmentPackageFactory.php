<?php

use App\Models\Area;
use App\Models\Country;
use App\Models\ShipmentPackage;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(ShipmentPackage::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'slug_ar' => $faker->name,
        'slug_en' => $faker->name,
        'charge' => $faker->randomFloat(1, 0, 9),
        'active' => $faker->boolean(true),
        'is_available' => $faker->boolean(true),
        'notes_ar' => $faker->paragraph,
        'notes_en' => $faker->paragraph,
        'image' => 'square.png',,
    ];
});
