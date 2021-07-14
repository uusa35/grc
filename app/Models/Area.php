<?php

namespace App\Models;

class Area extends PrimaryModel
{
    use ModelHelpers;
    protected $guarded = [''];
    protected $localeStrings = ['slug'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function governate()
    {
        return $this->belongsTo(Governate::class);
    }

    public function branches()
    {
        return $this->hasMany(Branch::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'area_service');
    }

    public function classifieds()
    {
        return $this->hasMany(Classified::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

}
