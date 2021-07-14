<?php

namespace App\Models;


class Page extends PrimaryModel
{
    use ModelHelpers;
    protected $localeStrings = ['slug','title','content'];
    protected $guarded = [''];
}
