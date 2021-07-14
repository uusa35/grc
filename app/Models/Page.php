<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends PrimaryModel
{
    use HasFactory;
    protected $localeStrings = ['name','caption','description'];
    protected $guarded = [''];

    public function categories() {
        return $this->belongsToMany(Category::class,'categoryables');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function sections()
    {
        return $this->morphMany(Section::class, 'sectionable');
    }
}

