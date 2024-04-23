<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\User;
use App\Models\skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index()
    {

        if (auth()->user()->rol_id == 1) {
            $mensaje = session('msj');
            if ($mensaje) {
                Session::forget('msj');
            }

            $users = User::select('id', 'name', 'telefono', 'email', 'status', 'rol_id')
                ->with(['rol', 'skills' => function ($query) {
                    $query->where('status', 1);
                }, 'skills.skill'])
                ->get();

            $roles = Rol::select('id', 'name')->where('status', 1)->get();

            return Inertia::render('Usuarios/Index', [
                'users' => $users,
                'roles' => $roles,
                'msj' => $mensaje,
                'skills' => skill::all()
            ]);
        } else {
            return json_encode('No tienes permiso para esta transaccion');
        }
    }

    public function update(Request $request)
    {

        if (auth()->user()->rol_id == 1) {
        
            $user = User::findOrFail($request->id);

            // Actualizar los campos del usuario
            $user->update($request->all());
            
            // Desactivar las habilidades que no esten en la lista de habilidades enviadas
            $requestedSkillsIds = collect($request->skills)->pluck('skill_id')->toArray();
            $user->skills()->whereNotIn('skill_id', $requestedSkillsIds)->update(['status' => 0]);
           
            // Actualizar las habilidades del usuario
            foreach ($request->skills as $skill) {
                $user->skills()->updateOrCreate(
                    ['skill_id' => $skill['skill_id']],
                    ['level' => $skill['level'],'status' => 1]
                 
                );
            }

            session()->put('msj', ["success" => 'Usuario actializado con exito']);
        } else {

            session()->put('msj', ["error" => 'No tienes permiso para esta transaccion']);
        }

        return redirect(route('usuarios.index'));
    }

    public function destroy(string $id)
    {

        if (auth()->user()->rol_id == 1) {

            User::destroy($id);
            session()->put('msj', ["success" => 'Usuario eliminado con exito']);
        } else {
            session()->put('msj', ["error" => 'No tienes permiso para esta transaccion']);
        }
        return redirect(route('usuarios.index'));
    }
}
