<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\ContactusForm;
use App\Models\Faq;
use App\Models\Setting;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FrontendPageController extends Controller
{
    public function getContactus()
    {
        return inertia('Frontend/Pages/ContactusPage');
    }

    public function postContactus(Request $request)
    {
//        dd($request->request->all());
        $request->validate([
            'first_name' => 'required|min:3|max:200',
            'last_name' => 'required|min:3|max:200',
//            'mobile' => 'min:10|max:15',
            'subject' => 'required',
            'content' => 'required',
            'code' => 'required|confirmed'
        ]);
        $settings = Setting::first();
        Mail::to($settings->email)->cc($request->email)->send(new ContactusForm());
        return redirect()->route('frontend.home')->with('success', trans('general.process_success'));
    }

    public function getAboutus()
    {
        $element = Setting::first()->only('name_ar', 'name_en', 'caption_ar', 'caption_en', 'aboutus_ar', 'aboutus_en');
        return inertia('Frontend/Pages/AboutusPage', compact('element'));
    }

    public function getPolicies()
    {
        $element = Setting::first()->only('name_ar', 'name_en', 'caption_ar', 'caption_en', 'policy_ar', 'policy_en');
        return inertia('Frontend/Pages/PolicesPage', compact('element'));
    }

    public function getTerms()
    {
        $element = Setting::first()->only('name_ar', 'name_en', 'caption_ar', 'caption_en', 'terms_ar', 'terms_en');
        return inertia('Frontend/Pages/TermsPage', compact('element'));
    }

    public function getFaqs()
    {
        $elements = Faq::active()->get();
        return inertia('Frontend/Pages/FaqsPage', compact('elements'));
    }

    public function getSubscriptions()
    {
        $elements = Subscription::active()->get();
        return inertia('Frontend/Pages/SubscriptionsPage', compact('elements'));
    }
}
