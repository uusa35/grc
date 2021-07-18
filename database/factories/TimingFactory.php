<?php

namespace Database\Factories;

use App\Models\Day;
use App\Models\Service;
use App\Models\Model;
use App\Models\Timing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class TimingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Timing::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'day' => Day::all()->random()->day,
            'start' => $this->faker->randomElement(['10:00', '15:00', '20:00']),
            'end' => $this->faker->randomElement(['12:00', '17:00', '22:00']),
            'is_off' => $this->faker->boolean,
            'is_available' => $this->faker->boolean,
            'allow_multi_select' => $this->faker->boolean,
            'type' => $this->faker->name,
            'today' => $this->faker->date('d/m/Y'),
            'active' => $this->faker->boolean(true),
            'notes_ar' => $this->faker->name,
            'notes_en' => $this->faker->name,
            'week_start' => 6,
            'day_name_ar' => function ($arr) {
                return Day::where(['day' => $arr['day']])->first()->day_name_ar;
            },
            'day_name_en' => function ($arr) {
                return Day::where(['day' => $arr['day']])->first()->day_name_en;
            },
            'day_no' => function ($arr) {
                return Day::where(['day' => $arr['day']])->first()->day_no;
            },
            'day_id' => function ($arr) {
                return Day::where(['day' => $arr['day']])->first()->id;
            },
            'user_id' => User::all()->random()->id,
            'service_id' => Service::all()->random()->id,
            'order' => $this->faker->randomNumber()
        ];
    }
}
