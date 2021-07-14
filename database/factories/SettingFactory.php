<?php

use App\Models\Setting;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Setting::class, function (Faker $faker) use ($fakerAr) {
    return [
        'company_ar' => $faker->name,
        'company_en' => $faker->name,
        'address_ar' => $faker->name,
        'address_en' => $faker->name,
        'description_ar' => $faker->name,
        'description_en' => $faker->name,
        'mobile' => $faker->bankAccountNumber,
        'whatsapp' => $faker->bankAccountNumber,
        'phone' => $faker->bankAccountNumber,
        'country_ar' => $faker->country,
        'country_en' => $faker->country,
        'zipcode' => $faker->randomDigit,
        'email' => $faker->email,
        'android' => $faker->url,
        'apple' => $faker->url,
        'youtube' => $faker->url,
        'instagram' => $faker->url,
        'twitter' => $faker->url,
        'snapchat' => $faker->url,
        'facebook' => $faker->url,
        'logo' => app()->isLocal() ? 'logo-01.jpg' : 'logo-0' . $faker->numberBetween(1, 8) . '.png',
        'menu_bg' => app()->isLocal() ? 'logo-01.jpg' : 'logo-0' . $faker->numberBetween(1, 8) . '.png',
        'main_bg' => app()->isLocal() ? 'logo-01.jpg' : 'logo-0' . $faker->numberBetween(1, 8) . '.png',
        'gift_image' => app()->isLocal() ? 'logo-01.jpg' : 'logo-0' . $faker->numberBetween(1, 8) . '.png',
        'shipment_prices' => app()->isLocal() ? 'logo-01.jpg' : 'logo-0' . $faker->numberBetween(1, 8) . '.png',
        'size_chart' => $faker->numberBetween(1, 42) . '.jpeg',
        'cash_on_delivery' => $faker->boolean(),

        'main_theme_color' => '#000000',
        'main_theme_bg_color' => '#ffffff',

        'header_one_theme_color' => '#000000',
        'header_tow_theme_color' => '#000000',
        'header_three_theme_color' => '#000000',
        'header_one_theme_bg' => '#ffffff',
        'header_tow_theme_bg' => '#ffffff',
        'header_three_theme_bg' => '#ffffff',

        'normal_text_theme_color' => '#000000',

        'btn_text_theme_color' => '#ffffff',
        'btn_text_hover_theme_color' => '#ffffff',
        'btn_bg_theme_color' => '#000000',

        'menu_theme_color' => '#000000',
        'menu_theme_bg' => '#00000',

        'icon_theme_color' => '#000000',
        'icon_theme_bg' => '#ffffff',

        'header_theme_color' => '#000000',
        'header_theme_bg' => '#ffffff',

        'footer_theme_color' => '#000000',
        'footer_bg_theme_color' => '#ffffff',

        'longitude' => $faker->longitude,
        'latitude' => $faker->latitude,
        'show_commercials' => $faker->boolean(true),
        'splash_on' => $faker->boolean(true),
        'shipment_notes_ar' => $faker->name,
        'shipment_notes_en' => $faker->name,
        'policy_ar' => $faker->name,
        'policy_en' => $faker->name,
        'terms_ar' => $faker->name,
        'terms_en' => $faker->name,
        'gift_fee' => 5.00,
        'multi_cart_merchant' => $faker->boolean(true)
//        'shipment_service' => $faker->boolean(true),
//        'delivery_service' => $faker->boolean(false),
//        'delivery_service_cost' => 5,
//        'delivery_service_minimum_charge' => 100
    ];
});
