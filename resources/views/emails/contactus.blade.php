@component('mail::message')
@component('mail::panel')
# {{ trans('general.first_name') }} : {{ request()->first_name }}
# {{ trans('general.last_name') }} : {{ request()->last_name }}
# {{ trans('general.email') }} : {{ request()->email }}
# {{ trans('general.mobile') }} : {{ request()->mobile }}
@endcomponent

# {{ request()->subject }}
@component('mail::panel')
{{request()->content}}
@endcomponent

@component('mail::button', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent

{{ trans('general.thanks_contacting_us') }},<br>
{{ config('app.name') }}
@endcomponent
