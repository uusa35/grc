<?php

namespace App\Models;


class Comment extends PrimaryModel
{
    use ModelHelpers;
    protected $guarded = [''];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function owner()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
