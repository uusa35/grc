<?php

use App\Models\Country;
use App\Models\Role;
use Faker\Generator as Faker;
use \Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/
$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(App\Models\User::class, function (Faker $faker)  {
    return [
        'name' => $faker->name,
        'slug_ar' => $faker->realText(20),
        'slug_en' => $faker->name,
        'description_ar' => $faker->realText(120),
        'description_en' => $faker->name,
        'service_ar' => $faker->realText(120),
        'service_en' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
        'mobile' => $faker->bankAccountNumber,
        'phone' => $faker->bankAccountNumber,
        'fax' => $faker->name,
        'image' => 'square.png',
        'qr' => 'sample.png',
        'banner' => 'sample.png',
        'bg' => 'sample.png',
        'phone' => $faker->bankAccountNumber,
        'address' => $faker->address,
        'address_2' => $faker->address,
        'address_3' => $faker->address,
        'area' => $faker->streetName,
        'block' => $faker->randomDigit,
        'street' => $faker->streetName,
        'building' => $faker->randomDigit,
        'floor' => $faker->randomDigit,
        'apartment' => $faker->name,
        'country_name' => $faker->country,
        'country_id' => Country::where('is_local', true)->first()->id,
        'role_id' => Role::all()->random()->id,
        'api_token' => $faker->bankAccountNumber,
        'merchant_id' => $faker->bankAccountNumber,
        'path' => '1.pdf',
        'website' => $faker->url,
        'facebook' => $faker->url,
        'instagram' => $faker->url,
        'youtube' => $faker->url,
        'twitter' => $faker->url,
        'whatsapp' => $faker->bankAccountNumber,
        'iphone' => $faker->url,
        'android' => $faker->url,
        'longitude' => $faker->longitude,
        'latitude' => $faker->latitude,
        'policy_ar' => $faker->name,
        'policy_en' => $faker->name,
        'cancellation_ar' => $faker->name,
        'cancellation_en' => $faker->name,
        'keywords' => $faker->sentence,
        'balance' => $faker->numberBetween(5, 99),
        'on_home' => $faker->boolean(true),
        'is_male' => $faker->boolean,
        'video_url_one' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_two' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_three' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_four' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_five' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'player_id' => $faker->bankAccountNumber,
        'views' => $faker->numberBetween(10,999)
    ];
});
