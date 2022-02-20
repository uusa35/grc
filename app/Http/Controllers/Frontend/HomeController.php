<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookExtraLightResource;
use App\Http\Resources\CategoryExtraLightResource;
use App\Http\Resources\CourseExtraLightResource;
use App\Http\Resources\ProductExtraLightResource;
use App\Http\Resources\SettingResource;
use App\Http\Resources\SlideExtraLightResource;
use App\Http\Resources\TranslationResource;
use App\Http\Resources\UserExtraLightResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Newsletter;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Translation;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $slides = SlideExtraLightResource::collection(Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active()->orderby('order', 'asc');
        }])->first()->slides);
        $newOnHomeBooks = BookExtraLightResource::collection(Book::active()->onHome()->onNew()->orderBy('order', 'asc')->get());
        $newOnHomeCourses = CourseExtraLightResource::collection(Course::active()->onHome()->onNew()->orderBy('order', 'asc')->get());
//        $newOnHomeProducts = ProductExtraLightResource::collection(Product::active()->onHome()->onNew()->with('product_attributes')->orderBy('order', 'asc')->get());
        $onHomeParticipantAuthors = UserExtraLightResource::collection(User::active()->onHome()->authors()->notClients()->notAdmins()->orderBy('order', 'asc')->get());
//        $categoriesWithProducts = CategoryExtraLightResource::collection(Category::active()->onlyParent()->onlyForProducts()->orderBy('order', 'asc')->limit(3)->with('products.product_attributes')->get());
        return inertia('Frontend/Home/HomePage', compact('slides', 'newOnHomeBooks', 'onHomeParticipantAuthors', 'newOnHomeCourses'));
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

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * **/
    public function postNewsLetter(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters',
        ]);
        if (Newsletter::create($request->all())) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
