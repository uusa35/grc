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

    public function changeLang($locale)
    {
        if (!in_array($locale, ['en', 'ar'])) {
            abort(400);
        }
        app()->setLocale($locale);
        session()->put('locale', $locale);
//        return inertia(".$component.");
        return redirect()->to(request()->url);
    }
}
