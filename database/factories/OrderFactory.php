<?php

use App\Models\Branch;
use App\Models\Country;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Questionnaire;
use App\Models\User;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    return [
        'user_id' => User::all()->random()->id,
        'status' => $faker->randomElement(['pending', 'success', 'failed', 'delivered']),
        'price' => $faker->numberBetween(22, 99),
        'discount' => $faker->numberBetween(10, 22), // discount will be updated if there is a coupon applied.
        'shipment_fees' => $faker->numberBetween(10, 22), // discount will be updated if there is a coupon applied.
        'net_price' => function ($array) {
            return $array['price'] - $array['discount'];
        },
        'email' => $faker->email,
        'address' => $faker->address,
        'mobile' => $faker->bankAccountNumber,
        'phone' => $faker->bankAccountNumber,
        'reference_id' => $faker->bankAccountNumber,
        'branch_id' => Branch::all()->random()->id,
        'payment_method' => $faker->randomElement(['cash', 'visa', 'mastercard']),
        'country' => Country::all()->random()->name,
        'area' => $faker->country,
        'coupon_id' => Coupon::all()->random()->id,
        'booked_at' => Carbon::now()->addDays($faker->numberBetween(1, 9)),
        'day' => function ($array) {
            return Carbon::parse($array['booked_at'])->format('l');
        },
        'time' => function ($array) {
            return Carbon::parse(($array['booked_at']))->format('h:i:s');
        },
        'notes' => $faker->paragraph,
        'paid' => $faker->boolean(true),
        'shipment_reference' => $faker->bankAccountNumber,
        'cash_on_delivery' => $faker->boolean,
    ];
});
