<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Day extends PrimaryModel
{
    protected $localeStrings = ['day_name'];

    public function timings() {
        return $this->hasMany(Timing::class);
    }
}
