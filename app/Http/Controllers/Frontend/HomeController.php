<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookExtraLightResource;
use App\Http\Resources\CategoryExtraLightResource;
use App\Http\Resources\CourseExtraLightResource;
use App\Http\Resources\SettingResource;
use App\Http\Resources\SlideExtraLightResource;
use App\Http\Resources\UserExtraLightResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
//        return inertia('HomePageTest');
        $slides = SlideExtraLightResource::collection(Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active();
        }])->first()->slides);
        $homeBookCategories = CategoryExtraLightResource::collection(Category::active()->onHome()->onlyParent()->onlyForBooks()->get());
        $newOnHomeBooks = BookExtraLightResource::collection(Book::active()->onHome()->onNew()->with('user')->get());
        $newOnHomeCourses = CourseExtraLightResource::collection(Course::active()->onHome()->onNew()->with('user')->get());
        $onHomeParticipantAuthors = UserExtraLightResource::collection(User::active()->OnHome()->get());
        $meta = SettingResource::make(Setting::first());
        return inertia('Frontend/HomePage', compact('slides', 'homeBookCategories', 'newOnHomeBooks', 'onHomeParticipantAuthors', 'newOnHomeCourses'))
            ->withViewData([
            'meta' => $meta,
        ]);

    }

    public function changeLang($lang)
    {
        if (!in_array($lang, ['en', 'ar'])) {
            abort(400);
        }
        app()->setLocale($lang);
        session()->put('lang', $lang);
        return redirect()->back();
    }
}
