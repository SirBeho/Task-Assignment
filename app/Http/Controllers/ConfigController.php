<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use App\Models\TaskType;
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

        $empresa =  null;

        return Inertia::render('Mantenimiento/Index', [
            'Tasktypes' => TaskType::where('status', '1')
            ->with(['requisitos' => function ($query) { $query->where('status', 1);},'requisitos.skill'])->get(),
            'empresa' => null,
            'msj' => $mensaje,
            'skills' => skill::all()
        ]); 

    }


    public function update(Request $request, $id)
    {

        try {
            $empresa =  Config::find($id);
            $empresa->update($request->all());
            session()->put('msj', ["success" => 'Informacion guardada con exito']);
        } catch (\Exception $e) {
            session()->put('msj', ['error' => 'Error en la acción realizada']);
        }

        return redirect(route('empresa.index'));

    }
}
