<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Slide;

class HomeController extends Controller
{
    public function index()
    {
//        return inertia('HomePage', compact('slides'));
        if (auth()->guest()) {
            return view('auth.login');
        }
        return redirect()->route('backend.home')->with('success', trans('process_success'));

    }

    public function changeLang($locale)
    {
        if (!in_array($locale, ['en', 'ar'])) {
            abort(400);
        }
        app()->setLocale($locale);
        session()->put('locale', $locale);
        return redirect()->to(url()->previous());
    }
}
