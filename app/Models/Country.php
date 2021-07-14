<?php

namespace App\Models;


class Country extends PrimaryModel
{
    use ModelHelpers;
    protected $localeStrings = ['slug','currency_symbol'];
    protected $guarded = [''];
    protected $casts = [
        'is_local' => 'boolean',
        'active' => 'boolean'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function classifieds()
    {
        return $this->hasMany(Classified::class);
    }

    public function governates()
    {
        return $this->hasMany(Governate::class);
    }

    public function areas()
    {
        return $this->hasMany(Area::class);
    }

    public function currency()
    {
        return $this->hasOne(Currency::class);
    }

    // hasManyThrough
    // Many Products though user
    public function products()
    {
        return $this->hasManyThrough(Product::class, User::class);
    }

    // hasManyThrough
    // Many Products though user
    public function branches()
    {
        return $this->hasManyThrough(Branch::class, Area::class);
    }

    public function order_metas()
    {
        return $this->hasMany(OrderMeta::class, 'destination_id');
    }

    public function shipment_packages()
    {
        return $this->belongsToMany(ShipmentPackage::class);
    }

    public function addresses() {
        return $this->hasMany(Address::class);
    }

}
