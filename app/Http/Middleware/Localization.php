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

    const SESSION_KEY = 'locale';
    const LOCALES = ['en', 'ar'];

    public function handle($request, Closure $next)
    {
        /** @var Session $session */
        $session = $request->getSession();

        if (!$session->has(self::SESSION_KEY)) {
            $session->put(self::SESSION_KEY, app()->getLocale());
        }

        if ($request->has(self::SESSION_KEY)) {
            $lang = $request->get(self::SESSION_KEY);
            if (in_array($lang, self::LOCALES)) {
                $session->put(self::SESSION_KEY, $lang);
            }
        }
        Carbon::setLocale($session->get(self::SESSION_KEY));
        app()->setLocale($session->get(self::SESSION_KEY));
        unset($request['locale']);
        return $next($request);
    }
}
