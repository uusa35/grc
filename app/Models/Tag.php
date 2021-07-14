<?php

namespace App\Models;

class Tag extends PrimaryModel
{
    protected $localeStrings = ['slug'];
    protected $guarded = [''];

    public function products()
    {
        return $this->morphedByMany(Product::class, 'taggable');
    }

    public function services()
    {
        return $this->morphedByMany(Service::class, 'taggable');
    }

    public function classifieds()
    {
        return $this->morphedByMany(Classified::class, 'taggable');
    }

    public function categories()
    {
        return $this->morphedByMany(Category::class, 'taggable');
    }
}
