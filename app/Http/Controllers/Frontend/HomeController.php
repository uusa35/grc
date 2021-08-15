<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Slide;

class HomeController extends Controller
{
    public function index()
    {
        $slides  = Slide::active()->onHome()->get();
//        $homeCategories = Category::active()->onlyParent()->with('children.children')->get();
//        dd($homeCategories);
        return inertia('Frontend/HomePage', compact('slides'));

    }

    public function changeLang($locale)
    {
        if (!in_array($locale, ['en', 'ar'])) {
            abort(400);
        }
        app()->setLocale($locale);
        session()->put('locale', $locale);
        return redirect()->back()->with('success','lang changed');
    }
}
