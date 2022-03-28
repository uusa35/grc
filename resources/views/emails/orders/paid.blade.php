<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" style="font-weight: bolder; text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">
@component('mail::message')
# {{ trans('general.invoice_no') }} :  {{ $order->id }}
# {{ trans('general.username') }} : {{ $order->user->name_ar }} - {{ $order->user->name_en }}
# {{ trans('general.email') }} : {{ $order->user->email }}
# {{ trans('general.mobile') }} : {{ $order->user->mobile }}
@component('mail::table')
|       |  {{ trans('general.order_details') }}||
| ------------- |:-------------:| --------:|
@endcomponent
@component('mail::table')
| {{ trans('general.id') }}       |  {{ trans('general.name') }}         |  {{ trans('general.type') }}  |
| ------------- |:-------------:| --------:|
@foreach($order->order_metas as $meta)
| {{ ($loop->index+1) }}      | {{ $meta->name }}      |    {{ ucfirst($meta->ordermetable()->first()->type) }}   |
@if($meta->ordermetable()->first()->type === 'product')
| | {{ trans('general.color') }} : {{ $meta->color }}| |
| | {{ trans('general.size') }} : {{ $meta->size }}| |
| | {{ trans('general.notes') }} : {{ $meta->notes }}| |
@endif
@if($meta->ordermetable()->first()->type === 'service')
| | {{ trans('genreal.booked_at') }} : {{ $meta->booked_at }}| |
| | {{ trans('general.time') }} : {{ $meta->time }}| |
| | {{ trans('general.notes') }} : {{ $meta->notes }}| |
@endif
@endforeach
@endcomponent

@component('mail::table')
|       |  {{ trans('general.invoice_summary') }}||
| ------------- |:-------------:| --------:|
@endcomponent
@component('mail::table')
|       |           |  {{ trans('general.total') }}  |
| ------------- |:-------------:| --------:|
| {{ trans('general.price') }}      |       |    {{ $order->price }}   {{ trans('general.kd') }}|
| {{ trans('general.shipment_fees') }}      |       |    {{ $order->shipment_fees }}   {{ trans('general.kd') }}|
| {{ trans('general.discount') }}      |       |    {{ $order->discount }}   {{ trans('general.kd') }}|
| {{ trans('general.net_total') }}      |       |    {{ $order->net_price }}   {{ trans("general.kd") }}|
@endcomponent

@component('mail::button', ['url' => route('frontend.home')])
{{ config('app.name') }}
@endcomponent

{{ trans('general.thanks') }},<br>
{{ config('app.name') }}
@endcomponent
</div>
