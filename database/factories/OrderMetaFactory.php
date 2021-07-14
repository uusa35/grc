<?php

use App\Models\Collection;
use App\Models\Color;
use App\Models\Country;
use App\Models\Order;
use App\Models\OrderMeta;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Questionnaire;
use App\Models\Service;
use App\Models\Size;
use App\Models\Timing;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(OrderMeta::class, function (Faker $faker) {
    return [

        'order_id' => Order::all()->random()->id,
        'service_id' => Service::all()->random()->id,
        'qty' => $faker->numberBetween(1, 3),
        'product_id' => Product::all()->random()->id,
        'item_type' => 'product',
        'price' => function ($array) {
            $product = Product::whereId($array['product_id'])->first();
            return $product->isOnSale ? $product->sale_price : $product->price;
        },
        'shipment_cost' => $faker->numberBetween(1, 3),
        'product_attribute_id' => function ($array) {
            $attribute = ProductAttribute::where('product_id', $array['product_id'])->first();
            return $attribute ? $attribute->id : null;
        },
        'item_name' => function ($array) {
            return Product::whereId($array['product_id'])->first()->name;
        },
        'product_size' => function ($array) {
            $productAttribute = ProductAttribute::whereId($array['product_attribute_id'])->first();
            return $productAttribute ? $productAttribute->size()->first()->name : Size::all()->random()->name;
        },
        'product_color' => function ($array) {
            $productAttribute = ProductAttribute::whereId($array['product_attribute_id'])->first();
            return $productAttribute ? $productAttribute->color()->first()->name : Color::all()->random()->name;
        },
        'service_date' => $faker->date(),
        'service_time' => $faker->time(),
        'timing_id' => Timing::workingDays()->get()->random()->id,
        'destination_id' => Country::all()->random()->id,
        'collection_id' => Collection::all()->random()->id,
        'questionnaire_id' => Questionnaire::all()->random()->id,
        'merchant_id' => User::all()->random()->id,
    ];
});
