<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Currency extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];
    protected $localeStrings = ['currency_symbol', 'name'];
    protected $appends = ['imageLarge', 'imageThumb'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function getSymbolAttribute()
    {
        $symbol = app()->isLocale('ar') ? 'currency_symbol_ar' : 'currency_symbol_en';
        return $this->$symbol;
    }
}
