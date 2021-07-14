<?php

namespace App\Models;

class Branch extends PrimaryModel
{
    protected $guarded = [''];
    protected $localeStrings = ['name','address'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function area() {
        return $this->belongsTo(Area::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
