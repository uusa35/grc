<?php

namespace App\Models;


class Privilege extends PrimaryModel
{
    protected $localeStrings = ['slug'];
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
