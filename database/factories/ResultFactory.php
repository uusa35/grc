<?php

use App\Models\Question;
use App\Models\Questionnaire;
use App\Models\Result;
use Faker\Generator as Faker;

$factory->define(Result::class, function (Faker $faker) {
    return [
        'questionnaire_id' => Questionnaire::all()->random()->id,
        'question_id' => Question::all()->random()->id,
        'answer_id' => function ($array) {
            return Question::whereId($array['question_id'])->first()->answers()->get()->random()->id;
        },
        'questioned' => $faker->sentence,
        'answered' => $faker->sentence,
    ];
});
