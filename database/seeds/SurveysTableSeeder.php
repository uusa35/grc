<?php

use App\Models\Answer;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Database\Seeder;

class SurveysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Survey::class, app()->environment('production') ? 2 : 10)->create()->each(function ($s) {
            $s->questions()->saveMany(factory(Question::class, app()->environment('production') ? 2 : 5)->create()->each(function ($q) {
                $q->answers()->saveMany(factory(Answer::class,3)->create());
            }));
        });
    }
}
