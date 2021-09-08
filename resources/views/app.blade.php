@php
    try {
        $ssr = Http::get('http://ecommerce-backend.test/render', $page)->throw()->json();
    } catch (Exception $e) {
        $ssr = null;
    }
@endphp
    <!DOCTYPE html>
<html>
<head>
    @if(isset($page['props']['book']))
        <title>{{$page['props']['book']->{'name_'.app()->getLocale()}  }}</title>
        <meta name="description" content="{{$page['props']['book']->{'description_'.app()->getLocale()}  }}"/>
    @elseif(isset($page['props']['course']))
        <title>{{$page['props']['course']->{'name_'.app()->getLocale()}  }}</title>
        <meta name="description" content="{{$page['props']['course']->{'description_'.app()->getLocale()}  }}"/>
    @elseif(isset($page['props']['service']))
        <title>{{$page['props']['service']->{'name_'.app()->getLocale()}  }}</title>
        <meta name="description" content="{{$page['props']['service']->{'description_'.app()->getLocale()}  }}"/>
    @else
        <title>{{$page['props']['settings']->{'name_'.app()->getLocale()}  }}</title>
        <meta name="title" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
        <meta name="description" content="{{$page['props']['settings']->{'description_'.app()->getLocale()}  }}"/>
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
@if ($ssr)
    {!! $ssr['body'] !!}
@else
    @routes
    @inertia
@endif
</body>
</html>
