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


        // Obtenemos la configuración de la base de datos
        $configuracion = \App\Models\Config::first();

        // Creamos un array con los datos de la configuración
        $config = [   
            'rangeLevel' => [
                'min' => $configuracion->range_level_min,
                'max' => $configuracion->range_level_max
            ],
            'work_queue' => $configuracion->work_queue,
        ];
            
       

        // Agregamos los datos a todas las respuestas de Inertia
        Inertia::share('config', $config);
        Inertia::share('configuracion', $configuracion);


        return $next($request);
    }
}