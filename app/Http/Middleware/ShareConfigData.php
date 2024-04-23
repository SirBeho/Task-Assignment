<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ShareConfigData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $config = [
            'key' => 'value',
            // Agrega aquí más datos según necesites
        ];

        // Agregamos los datos a todas las respuestas de Inertia
        Inertia::share('config', $config);


        return $next($request);
    }
}
