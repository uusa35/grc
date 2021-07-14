<?php

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Size;
use Faker\Generator as Faker;

$factory->define(ProductAttribute::class, function (Faker $faker) {
    return [
        'product_id' => Product::withoutGlobalScopes()->whereDoesntHave('product_attributes')->pluck('id')->unique()->shuffle()->first(),
        'size_id' => Size::all()->random()->id,
        'color_id' => Color::all()->random()->id,
        'qty' => $faker->numberBetween(1, 50),
        'notes_ar' => $faker->paragraph(1),
        'notes_en' => $faker->paragraph(1),
    ];
});
