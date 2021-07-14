<?php

namespace App\Models;

class Governate extends PrimaryModel
{
    protected $localeStrings = ['slug'];
    protected $guarded = [''];

    public function country() {
        return $this->belongsTo(Country::class);
    }

    public function areas() {
        return $this->hasMany(Area::class);
    }

//    public function getAreaNameAttribute() {
//        return $this->appends['areaName'] = [
//            $this->name => $this->areas()->get()->pluck('slug')
//        ];
//    }

    public function users() {
        return $this->hasMany(User::class);
    }

    public function addresses() {
        return $this->hasMany(Address::class);
    }
}
