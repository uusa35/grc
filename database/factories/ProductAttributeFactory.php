<?php

namespace Database\Factories;

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Model;
use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\Factory;


class ProductAttributeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductAttribute::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'product_id' => Product::withoutGlobalScopes()->whereDoesntHave('product_attributes')->pluck('id')->unique()->shuffle()->first(),
            'size_id' => Size::all()->random()->id,
            'color_id' => Color::all()->random()->id,
            'qty' => $this->faker->numberBetween(1, 50),
            'notes_ar' => $this->faker->paragraph(1),
            'notes_en' => $this->faker->paragraph(1),
            'price' => $this->faker->randomFloat(3, 10, 200),
        ];
    }
}
