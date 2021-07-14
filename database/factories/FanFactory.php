<?php

use App\Models\Collection;
use App\Models\Fan;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Fan::class, function (Faker $faker) {
    return [
        'user_id' => User::designers()->get()->random()->id,
        'fan_id' => User::clients()->get()->random()->id,
        'product_id' => Product::all()->random()->id,
        'service_id' => Service::all()->random()->id,
        'collection_id' => Collection::all()->random()->id,
    ];
});
