<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;

class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        session()->has('locale') ? app()->setLocale(session()->get('locale')) : app()->getLocale();
        Carbon::setLocale(session()->get('locale'));
        return $next($request);
    }
}
