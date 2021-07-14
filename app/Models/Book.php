<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends PrimaryModel
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }
}
