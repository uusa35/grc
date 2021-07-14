<?php

namespace App\Models;

class Video extends PrimaryModel
{
    use ModelHelpers;
    protected $guarded = [''];
    protected $localeStrings = ['caption','name'];

    public function products()
    {
        return $this->morphedByMany(Product::class, 'videoable');
    }

    public function services()
    {
        return $this->morphedByMany(Service::class, 'videoable');
    }
}
