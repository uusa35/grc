<?php

namespace App\Models;


class Post extends PrimaryModel
{
    use ModelHelpers;
    protected $guarded = [''];
    protected $localeStrings = ['title', 'slug', 'content'];

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
}
