<?php

namespace App\Models;


class Faq extends PrimaryModel
{
    protected $guarded = [''];
    public $localeStrings = ['title','content'];
}
