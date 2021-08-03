<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends PrimaryModel
{
    use HasFactory;
    public $localeStrings = ['name', 'caption', 'description', 'notes'];
    protected $guarded = [''];

    public function users() {
        return $this->hasMany(User::class);
    }
}
