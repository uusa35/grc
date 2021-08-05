<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Book;
use App\Models\Color;
use App\Models\Country;
use App\Models\Order;
use App\Models\OrderMeta;
use App\Models\Model;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Service;
use App\Models\Size;
use App\Models\Timing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class OrderMetaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OrderMeta::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'order_id' => Order::all()->random()->id,
            'qty' => $this->faker->numberBetween(1, 3),
            'price' => $this->faker->numberBetween(10,99),
            'shipment_cost' => $this->faker->numberBetween(1, 3),
            'wrap_as_gift' => $this->faker->boolean,
            'product_attribute_id' => ProductAttribute::all()->random()->id,
            'color_id' => Color::all()->random()->id,
            'size_id' => Size::all()->random()->id,
            'timing_id' => Timing::all()->random()->id,
            'country_id' => Country::all()->random()->id,
            'merchant_id' => User::all()->random()->id,

            'ordermetable_type' => $this->faker->randomElement(['App\Models\Product', 'App\Models\Book', 'App\Models\Course', 'App\Models\Service']),
            'ordermetable_id' => $this->faker->numberBetween(1, 99)
        ];
    }
}
