<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends PrimaryModel
{
    use HasFactory, ModelHelpers;

    protected $guarded = [''];
    public $localeStrings = ['title', 'content'];
    protected $appends = ['imageLargeLink', 'imageThumbLink'];

    public function sectionable()
    {
        return $this->morphTo();
    }

    public function template()
    {
        return $this->belongsTo(Template::class);
    }
}
