<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Slide;

class HomeController extends Controller
{
    public function index()
    {
        $slides = Slide::active()->onHome()->get();
        return inertia('FrontendHomePage', compact('slides'));
    }

    public function changeLang($locale, $component)
    {
        if (!in_array($locale, ['en', 'ar'])) {
            abort(400);
        }
        app()->setLocale($locale);
        var_dump(app()->getLocale());
        return inertia(".$component.");
    }
}
