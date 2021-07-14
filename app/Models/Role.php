<?php

namespace App\Models;

use App\Services\Traits\LocaleTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends PrimaryModel
{
    use HasFactory, LocaleTrait;
    protected $guarded = [''];
    protected $localeStrings = ['name','caption'];
    protected $casts = [
        'is_designer' => 'boolean',
        'is_client' => 'boolean',
        'is_company' => 'boolean',
        'is_super' => 'boolean',
        'is_admin' => 'boolean',
    ];

    public function privileges()
    {
        return $this->belongsToMany(Privilege::class)->withPivot('index','view', 'create','update','delete');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
