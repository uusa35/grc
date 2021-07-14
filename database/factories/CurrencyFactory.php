<?php

use App\Models\Country;
use App\Models\Currency;
use Faker\Generator as Faker;

$factory->define(Currency::class, function (Faker $faker) {
    return [
        'name_ar' => $faker->name,
        'name_en' => $faker->name,
        'country_id' => Country::doesntHave('currency')->first()->id,
        'currency_symbol_ar' => function ($array) {
            return Country::whereId($array['country_id'])->first()->currency_symbol_ar;
        },
        'currency_symbol_en' => function ($array) {
            return Country::whereId($array['country_id'])->first()->currency_symbol_en;
        },
        'active' => $faker->boolean(true),
        'exchange_rate' => $faker->numberBetween(1,8),
        'active' => $faker->boolean(true),
    ];
});
