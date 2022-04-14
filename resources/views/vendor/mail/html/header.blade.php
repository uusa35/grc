<tr>
<td class="header">
@if (trim($slot) === 'Laravel')
<a href="{{ $url }}" style="display: inline-block;">
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
</a>
@else
{{ $slot }}
@endif
</td>
</tr>
