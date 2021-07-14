<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Order;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'user_id' => User::all()->random()->id,
            'status' => $this->faker->randomElement(['pending', 'success', 'failed', 'delivered']),
            'price' => $this->faker->numberBetween(22, 99),
            'discount' => $this->faker->numberBetween(10, 22), // discount will be updated if there is a coupon applied.
            'shipment_fees' => $this->faker->numberBetween(10, 22), // discount will be updated if there is a coupon applied.
            'net_price' => function ($array) {
                return $array['price'] - $array['discount'];
            },
            'email' => $this->faker->email,
            'address' => $this->faker->address,
            'mobile' => $this->faker->bankAccountNumber,
            'phone' => $this->faker->bankAccountNumber,
            'reference_id' => $this->faker->bankAccountNumber,
            'branch_id' => Branch::all()->random()->id,
            'payment_method' => $this->faker->randomElement(['cash', 'visa', 'mastercard']),
            'country' => Country::all()->random()->name,
            'area' => $this->faker->country,
            'coupon_id' => Coupon::all()->random()->id,
            'booked_at' => Carbon::now()->addDays($this->faker->numberBetween(1, 9)),
            'day' => function ($array) {
                return Carbon::parse($array['booked_at'])->format('l');
            },
            'time' => function ($array) {
                return Carbon::parse(($array['booked_at']))->format('h:i:s');
            },
            'notes' => $this->faker->paragraph,
            'paid' => $this->faker->boolean(true),
            'shipment_reference' => $this->faker->bankAccountNumber,
            'cash_on_delivery' => $this->faker->boolean,
        ];
    }
}
