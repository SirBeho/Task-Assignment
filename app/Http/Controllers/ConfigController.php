<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use App\Models\TaskType;
use App\Models\TaskClasification;
use App\Models\TaskClasificationLevel;
use App\Models\skill;

class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $mensaje = session('msj');
        if ($mensaje) {
            Session::forget('msj');
        }

        return Inertia::render('Mantenimiento/Index', [
            'Tasktypes' => TaskType::with(['requisitos' => function ($query) { $query->where('status', 1);},'requisitos.skill'])->get(),
            'Clasifications' => TaskClasification::with('impact')->get(),   
            'ClassificationsLeves' => TaskClasificationLevel::all(),
            'msj' => $mensaje,
            'skills' => skill::all()
        ]); 

    }

    /**
     * Update the specified resource in storage.
     */
  


    public function update(Request $request)
    {   

        try {
            $Configuracion = Config::findOrFail($request->id);
            $Configuracion->update($request->all());
            session()->put('msj', ["success" => 'Informacion guardada con exito']);
        } catch (\Exception $e) {
            session()->put('msj', ['error' => 'Error en la acción realizada']);
        }

        return redirect(route('config.index'));

    }
}
