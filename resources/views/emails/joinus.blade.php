@component('mail::message')
@component('mail::panel')
# {{ trans('general.factory_name') }} : {{ request()->name }}
# {{ trans('general.email') }} : {{ request()->email }}
# {{ trans('general.mobile') }} : {{ request()->mobile }}
# {{ trans('general.address') }} : {{ request()->address }}
# {{ trans('general.website') }} : {{ request()->website }}
@endcomponent


@component('mail::panel')
# {{ trans('general.about_our_products') }}
# {{request()->content}}
@endcomponent
@component('mail::panel')
# {{ trans('general.other_notes') }}
# {{request()->notes}}
@endcomponent
@component('mail::panel')
# {{ trans('general.exported_before') }} : {{ request()->exported_before ? trans('general.yes') : trans('general.no') }}
@endcomponent

@component('mail::button', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent

{{ trans('general.thanks') }},<br>
{{ config('app.name') }}
@endcomponent
