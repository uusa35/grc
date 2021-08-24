<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet"/>
    <script src="{{ mix('/js/app.js') }}" defer></script>
    <?php $settings = \App\Models\Setting::first(); ?>
    <meta name="{{ config('app.name') }}" content="E-commerce">
    <meta name="theme-color" content="{{ $settings->theme }}">
    <meta name="keywords" content="{{ $settings->keywords }}"/>
    <meta name="author" content="{{ $settings->name_ar }}">
    <meta name="country" content="{{ $settings->country_en }}">
    <meta name="mobile" content="{{ $settings->mobile }}">
    <meta name="phone" content="{{ $settings->phone }}">
    <meta name="logo" content="{{ url(env('THUMBNAIL').$settings->image) }}">
    <meta name="email" content="{{ $settings->email }}">
    <meta name="address" content="{{ $settings->address_en }}">
    <meta name="name" content="{{ $settings->company }}">
    <meta name="lang" content="{{ app()->getLocale() }}">
    <meta name="description" content="{{ $settings->company . ' '.  $settings->description_en }}"/>
    <meta itemProp="name" content="{{ $settings->company }}"/>
    <meta itemProp="description" content="{{ $settings->company . ' '.  $settings->description_en }}"/>
    <meta itemProp="image" content="{{ url(env('THUMBNAIL').$settings->image) }}"/>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $settings->comapny_ar . ' '. $settings->name_en }}">
    <meta property="og:url" content="{{ env('APP_URL') }}">
    <meta property="og:title" content="{{ $settings->comapny_ar . ' '. $settings->name_en }}">
    <meta property="og:description" content="{{ $settings->description_en }}">
    <meta property="og:image" content="{{ url(env('THUMBNAIL').$settings->image) }}">
    <meta itemProp="whatsapp" content="{{ $settings->whatsapp }}"/>
    <meta itemProp="android" content="{{ $settings->android }}"/>
    <meta itemProp="apple" content="{{ $settings->apple }}"/>
    <meta itemProp="facebook" content="{{ $settings->facebook }}"/>
    <meta itemProp="facebook" content="{{ $settings->facebook }}"/>
    <meta property="facebook:card" content="{{ url(env('THUMBNAIL').$settings->image) }}">
    <meta property="facebook:url" content="{{ $settings->facebook }}">
    <meta property="facebook:title" content="{{ $settings->company }}">
    <meta property="facebook:description" content="{{ $settings->description_en }}">
    <meta property="facebook:image" content="{{ url(env('THUMBNAIL').$settings->image) }}">
    <meta itemProp="twitter" content="{{ $settings->twitter }}"/>
    <meta property="twitter:card" content="{{ url(env('THUMBNAIL').$settings->image) }}">
    <meta property="twitter:url" content="{{ $settings->twitter }}">
    <meta property="twitter:title" content="{{ $settings->company }}">
    <meta property="twitter:description" content="{{ $settings->description_en }}">
    <meta property="twitter:image" content="{{ url(env('THUMBNAIL').$settings->image) }}">
    <meta itemProp="latitude" content="{{ $settings->latitude }}"/>
    <meta itemProp="longitude" content="{{ $settings->longitude }}"/>
</head>
<body>
<div id="lang" style="display: none">{{ session()->get('lang') }}</div>
<form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
    @csrf
</form>
@routes
@inertia
</body>
</html>
