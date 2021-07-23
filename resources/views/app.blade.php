<!DOCTYPE html>
<html dir="{{ session()->get('locale') === 'ar' ? 'rtl' : 'ltr'}}" lang="{{ session()->get('locale') }}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet"/>
    <script src="{{ mix('/js/app.js') }}" defer></script>
</head>
<body dir="{{ session()->get('locale') === 'ar' ? 'rtl' : 'ltr'}}">
<div id="locale" style="display: none">{{ session()->get('locale') }}</div>
<form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
    @csrf
</form>
@inertia
</body>
</html>
