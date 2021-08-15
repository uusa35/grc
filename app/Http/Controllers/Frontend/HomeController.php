<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Slide;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        $slides  = Slide::active()->onHome()->get();
        $homeCategories = Category::active()->onlyParent()->onlyForBooks()->get();
        $newOnHomeBooks = Book::active()->onHome()->onNew()->get();
        $onHomeParticipantAuthors = User::active()->OnHome()->authors()->get();
        return inertia('Frontend/HomePage', compact('slides', 'homeCategories','newOnHomeBooks','onHomeParticipantAuthors'));

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
