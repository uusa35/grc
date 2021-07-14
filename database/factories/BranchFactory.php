<?php

use App\Models\Area;
use App\Models\Branch;
use App\Models\User;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Branch::class, function (Faker $faker) use ($fakerAr) {
    return [
        'name_ar' => $faker->name,
        'name_en' => $faker->name,
        'address_ar' => $faker->address,
        'address_en' => $faker->address,
        'phone' => $faker->bankAccountNumber,
        'mobile' => $faker->bankAccountNumber,
        'description_en' => $faker->sentence,
        'description_ar' => $fakerAr->realText(100),
        'area_id' => Area::all()->random()->id,
        'user_id' => User::all()->random()->id,
    ];
});
