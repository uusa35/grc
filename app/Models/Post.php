<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $guarded = [''];
    protected $localeStrings = ['title', 'name', 'content'];

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }
}
