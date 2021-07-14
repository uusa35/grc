<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Privilege extends PrimaryModel
{
    protected $localeStrings = ['name'];
    protected $guarded = [''];
    public function roles()
    {
        return $this->belongsToMany(Role::class)->withPivot('index','view', 'create', 'update', 'delete');
    }

    public function getCanSeeIndexAttribute() {
        return $this->pivot->index;
//        $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__}
    }
}
