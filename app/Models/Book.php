<?php

namespace App\Models;

use App\Services\Traits\LocaleTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends PrimaryModel
{
    use HasFactory, SoftDeletes;
//    public $localeStrings = ['name', 'description', 'notes'];
    protected $guarded = [''];
    protected $dates = ['created_at', 'deleted_at', 'start_sale', 'end_sale'];
//    protected $appends = ['imageThumb', 'imageLarge', 'name', 'description','type'];

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

    public function ordermetas()
    {
        return $this->morphMany(OrderMeta::class, 'ordermetable');
    }
}
