<?php

use App\Models\Questionnaire;
use App\Models\Result;
use Illuminate\Database\Seeder;

class QuestionnairesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Questionnaire::class, app()->environment('production') ? 2 : 10)->create()->each(function ($q) {
            $q->results()->saveMany(factory(Result::class, app()->environment('production') ? 1 : 2)->create());
        });
    }
}
