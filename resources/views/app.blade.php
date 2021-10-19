{{--@php--}}
{{--    try {--}}
{{--        $ssr = Http::get('http://ecommerce-backend.test/render', $page)->throw()->json();--}}
{{--    } catch (Exception $e) {--}}
{{--        $ssr = null;--}}
{{--    }--}}
{{--@endphp--}}
    <!DOCTYPE html>
<html>
<head>
    @if(request()->segment(1) !== 'backend')
        @if(isset($page['props']['element']) && $page['props']['element']->name_ar && !is_null(request()->segment(2)))
            <title>{{$page['props']['element']->{'name_'.app()->getLocale()}  }}</title>
            <meta name="description" content="{{$page['props']['element']->{'description_'.app()->getLocale()}  }}"/>
            {{--         facebook --}}
            <meta itemProp="facebook" content="{{$page['props']['element']->{'name_'.app()->getLocale()}  }}"/>
            <meta property="facebook:card" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
            <meta property="facebook:url" content="{{$page['props']['element']->{'name_'.app()->getLocale()}  }}"/>
            <meta property="facebook:title" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>
            <meta property="facebook:description"
                  content="{{$page['props']['element']->{'description_'.app()->getLocale()} }}"/>
            <meta property="facebook:image" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
            {{--         twitter --}}
            <meta itemProp="twitter" content="{{$page['props']['element']->{'name_'.app()->getLocale()}  }}"/>
            <meta property="twitter:card" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>
            <meta property="twitter:url" content="{{$page['props']['element']->{'name_'.app()->getLocale()}  }}"/>
            <meta property="twitter:title" content="{{$page['props']['element']->{'name_'.app()->getLocale()} }}"/>
            <meta property="twitter:description"
                  content="{{$page['props']['element']->{'description_'.app()->getLocale()} }}"/>
            <meta property="twitter:image" content="{{asset(env('THUMBNAIL').$page['props']['element']->image) }}"/>

        @else
            <title>{{$page['props']['settings']->{'name_'.app()->getLocale()} }} {{ request()->segment(1) ? ' :: '. trans('general.'.Str::plural(request()->segment(1))) : '' }}</title>
            <meta name="name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}">
            <meta name="title" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta name="description" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta name="keywords" content="{{ trans('general.app_keywords') }}"/>
            <meta name="author" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}">
            <meta name="country" content="{{$page['props']['settings']->{'country_'.app()->getLocale()} }}">
            <meta name="mobile" content="{{$page['props']['settings']->mobile }}">
            <meta name="phone" content="{{$page['props']['settings']->phone }}">
            <meta name="whatsapp" content="{{$page['props']['settings']->whatsapp }}">
            <meta name="logo" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}">
            <meta name="email" content="{{$page['props']['settings']->email }}">
            <meta name="address" content="{{$page['props']['settings']->{'address_'.app()->getLocale()} }}">
            <meta name="lang" content="{{ app()->getLocale() }}">
            <meta itemProp="name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta itemProp="description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta itemProp="image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="og:url" content="{{ env('APP_URL') }}"/>
            <meta property="og:title" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta property="og:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
            <meta property="og:image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="og:mobile" content="{{$page['props']['settings']->mobile }}"/>
            <meta property="og:whatsapp" content="{{$page['props']['settings']->whatsapp }}"/>
            {{--         faceboko --}}
            <meta itemProp="facebook" content="{{$page['props']['settings']->facebook }}"/>
            <meta property="facebook:card" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="facebook:url" content="{{$page['props']['settings']->facebook }}"/>
            <meta property="facebook:title" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="facebook:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()} }}"/>
            <meta property="facebook:image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            {{--         twitter --}}
            <meta itemProp="twitter" content="{{$page['props']['settings']->twitter }}"/>
            <meta property="twitter:card" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
            <meta property="twitter:url" content="{{$page['props']['settings']->twitter }}"/>
            <meta property="twitter:title" content="{{$page['props']['settings']->{'name_'.app()->getLocale()} }}"/>
            <meta property="twitter:description"
                  content="{{$page['props']['settings']->{'description_'.app()->getLocale()} }}"/>
            <meta property="twitter:image" content="{{asset(env('THUMBNAIL').$page['props']['settings']->image) }}"/>
        @endif
    @endif
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}" defer></script>
    {{--    @foreach($ssr['head'] ?? [] as $element)--}}
    {{--        {!! $element !!}--}}
    {{--    @endforeach--}}
</head>
<body>
<div id="lang" style="display: none">{{ session()->get('lang') }}</div>
<form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
    @csrf
</form>
{{--@if ($ssr)--}}
{{--    {!! $ssr['body'] !!}--}}
{{--@else--}}
{{--<a--}}
{{--    href="{{ route('frontend.paypal.index') }}"--}}
{{--    class="mt-10 bg-gray-900">--}}
{{--    paypall--}}
{{--</a>--}}
@routes
@inertia
{{--@endif--}}
</body>
</html>
