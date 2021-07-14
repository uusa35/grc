<?php

use App\Models\Brand;
use App\Models\Color;
use App\Models\Product;
use App\Models\ShipmentPackage;
use App\Models\Size;
use App\Models\User;
use Faker\Generator as Faker;

$fakerAr = \Faker\Factory::create('ar_JO');
$factory->define(Product::class, function (Faker $faker) use ($fakerAr) {
    return [
        'sku' => $faker->postcode,
        'active' => $faker->boolean(true),
        'name_ar' => 'تيشيرت' . $faker->numberBetween(1,999),
        'name_en' => 'T-shirt' . $faker->numberBetween(1, 999),
        'weight' => $faker->randomDigit,
        'home_delivery_availability' => $faker->boolean,
        'shipment_availability' => $faker->boolean,
        'on_new' => $faker->boolean(true),
        'exclusive' => $faker->boolean(true),
        'on_sale' => $faker->boolean,
        'on_home' => $faker->boolean,
        'is_available' => $faker->boolean(true),
        'direct_purchase' => $faker->boolean(false),
        'tailor_measurement_service' => $faker->boolean(false),
        'delivery_time' => $faker->numberBetween(1, 9),
        'price' => $faker->randomFloat(3, 10, 200),
        'sale_price' => function ($array) {
            return $array['price'] - rand(1, 5);
        },
        'size_chart_image' => 'sample.png',,
        'description_en' => $faker->paragraph,
        'description_ar' => $faker->paragraph,
        'notes_ar' => $faker->paragraph,
        'notes_en' => $faker->paragraph,
        'keywords' => $faker->sentence,
        'image' => 'square.png',,
        'qr' => 'sample.png',,
        'start_sale' => $faker->dateTime('now'),
        'end_sale' => $faker->dateTimeBetween('now', '1 year'),
        'check_stock' => $faker->boolean(true),
        'is_hot_deal' => $faker->boolean(true),
        'user_id' => User::active()->get()->random()->id,
        'color_id' => Color::all()->random()->id,
        'size_id' => Size::all()->random()->id,
        'shipment_package_id' => ShipmentPackage::all()->random()->id,
        'has_attributes' => $faker->boolean(true),
        'show_attribute' => $faker->boolean(true),
        'video_url_one' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_two' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_three' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_four' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'video_url_five' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
        'qty' => $faker->numberBetween(1, 99),
        'barcode' => $faker->isbn13,
        'brand_id' => Brand::all()->random()->id,
        'views' => $faker->randomNumber(),
        'wrap_as_gift' => $faker->boolean(true),
        'order' => $faker->numberBetween(1, 99),
    ];
});
