<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Model;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name' => $this->faker->name,
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->name,
            'caption_ar' => $fakerAr->realText(20),
            'name_en' => $this->faker->name,
            'description_ar' => $this->faker->realText(120),
            'description_en' => $this->faker->name,
            'service_ar' => $this->faker->realText(120),
            'service_en' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
            'remember_token' => $this->faker->linuxPlatformToken(),
            'mobile' => $this->faker->bankAccountNumber,
            'phone' => $this->faker->bankAccountNumber,
            'fax' => $this->faker->name,
            'image' => 'square.png',
            'qr' => 'sample.png',
            'banner' => 'sample.png',
            'bg' => 'sample.png',
            'phone' => $this->faker->bankAccountNumber,
            'address' => $this->faker->address,
            'area' => $this->faker->streetName,
            'block' => $this->faker->randomDigit,
            'street' => $this->faker->streetName,
            'building' => $this->faker->randomDigit,
            'floor' => $this->faker->randomDigit,
            'apartment' => $this->faker->name,
            'country_name' => $this->faker->country,
            'country_id' => Country::where('is_local', true)->first()->id,
            'role_id' => Role::notAdmins()->get()->random()->id,
            'api_token' => $this->faker->bankAccountNumber,
            'merchant_id' => $this->faker->bankAccountNumber,
            'path' => '1.pdf',
            'website' => $this->faker->url,
            'facebook' => $this->faker->url,
            'instagram' => $this->faker->url,
            'youtube' => $this->faker->url,
            'twitter' => $this->faker->url,
            'whatsapp' => $this->faker->bankAccountNumber,
            'iphone' => $this->faker->url,
            'android' => $this->faker->url,
            'longitude' => $this->faker->longitude,
            'latitude' => $this->faker->latitude,
            'policy_ar' => $this->faker->name,
            'policy_en' => $this->faker->name,
            'cancellation_ar' => $this->faker->name,
            'cancellation_en' => $this->faker->name,
            'keywords' => $this->faker->sentence,
            'balance' => $this->faker->numberBetween(5, 99),
            'on_home' => $this->faker->boolean(true),
            'is_male' => $this->faker->boolean,
            'video_url_one' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_two' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_three' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_four' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_five' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'player_id' => $this->faker->bankAccountNumber,
            'views' => $this->faker->numberBetween(10, 999)
        ];
    }
}
