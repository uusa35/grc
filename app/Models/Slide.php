<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slide extends PrimaryModel
{
    use HasFactory, SoftDeletes;
    protected $guarded = [''];
    protected $localeStrings = ['caption', 'title'];

    public function slidable()
    {
        return $this->morphTo();
    }

    public function getTypeAttribute()
    {
        return strtolower(class_basename($this->slidable_type));
    }
}
