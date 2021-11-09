<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookExtraLightResource;
use App\Http\Resources\CategoryExtraLightResource;
use App\Http\Resources\CourseExtraLightResource;
use App\Http\Resources\ProductExtraLightResource;
use App\Http\Resources\SettingResource;
use App\Http\Resources\SlideExtraLightResource;
use App\Http\Resources\UserExtraLightResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\User;

class HomeController extends Controller
{
    public function index()
    {
        $slides = SlideExtraLightResource::collection(Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active()->orderby('order','asc');
        }])->first()->slides);
        $homeCategories = CategoryExtraLightResource::collection(Category::active()->onHome()->orderby('order','asc')->get());
        $newOnHomeBooks = BookExtraLightResource::collection(Book::active()->onHome()->onNew()->with('user')->orderBy('order','asc')->get());
        $newOnHomeCourses = CourseExtraLightResource::collection(Course::active()->onHome()->onNew()->with('user')->orderBy('order','asc')->get());
        $newOnHomeProducts = ProductExtraLightResource::collection(Product::active()->onHome()->onNew()->with('user')->orderBy('order','asc')->get());
        $onHomeParticipantAuthors = UserExtraLightResource::collection(User::active()->OnHome()->authors()->orderBy('order','asc')->get());
        $onHomeClients = UserExtraLightResource::collection(User::active()->OnHome()->designers()->orderBy('order','asc')->get());
        $onHomePartners = UserExtraLightResource::collection(User::active()->OnHome()->celebrities()->orderBy('order','asc')->get());
        $meta = SettingResource::make(Setting::first());
        return inertia('Frontend/HomePage', compact('slides', 'homeCategories', 'newOnHomeBooks', 'onHomeParticipantAuthors', 'newOnHomeCourses','newOnHomeProducts', 'onHomeClients', 'onHomePartners'))
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
