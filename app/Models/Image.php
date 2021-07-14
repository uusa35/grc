<?php

namespace App\Models;

class Image extends PrimaryModel
{
    protected $guarded = [''];
    protected $localeStrings = ['caption','name'];

    public function imagable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
