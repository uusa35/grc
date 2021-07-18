<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];
    protected $localeStrings = ['caption','name'];
    protected $appends = ['imageThumb', 'imageLarge'];

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
