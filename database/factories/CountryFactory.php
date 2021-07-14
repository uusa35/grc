<?php

use App\Models\Country;
use Faker\Generator as Faker;

$factory->define(Country::class, function (Faker $faker) {
    return [
        'name' => $faker->country,
        'name_ar' => $faker->name,
        'name_en' => $faker->name,
        'country_code' => $faker->countryISOAlpha3,
        'image' => 'square.png',
        'order' => $faker->numberBetween(1, 40),
        'minimum_shipment_charge' => $faker->numberBetween(1, 5),
        'fixed_shipment_charge' => $faker->numberBetween(1, 10),
        'is_local' => $faker->boolean(true),
        'calling_code' => '00965',
        'has_currency' => $faker->boolean,
        'longitude' => $faker->longitude,
        'latitude' => $faker->latitude,
    ];
});
