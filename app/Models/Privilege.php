<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Privilege extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];
    protected $casts = [
        'main_menu' => 'boolean',
        'is_sub_module' => 'boolean',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class)->withPivot('index','view', 'create', 'update', 'delete');
    }
}
