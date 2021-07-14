<?php

namespace App\Models;

class Brand extends PrimaryModel
{
    use ModelHelpers;
    protected $localeStrings = ['slug'];
    protected $guarded = [''];
    protected $casts = [
        'on_home' => 'boolean',
        'active' => 'boolean'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
