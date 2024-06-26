<?php

namespace App\Http\Controllers;

use App\Models\TaskStat;
use App\Models\Notificacion;
use App\Models\Priority;
use App\Models\Task;
use App\Models\TaskType;
use App\Models\User;
use App\Models\TypeLevel;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\TaskClasification;
use App\Models\TaskClasificationLevel;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mensaje = session('msj');
        $resultado = session('resultado');

        if ($mensaje) {
            Session::forget('msj');
        }

        if ($resultado) {
            Session::forget('resultado');
        }

        return Inertia::render('Tasks/Index', [
            'taskTypes' => TaskType::where('status', '1')->with(['requisitos' => function ($query) { $query->where('status', 1);},'requisitos.skill'])->get(),
            'categorias' => TaskClasification::with('impact')->orderBy('impact_level')->get(),   
            'resultado' => $resultado,
            'msj' => $mensaje,
            'users' => User::all(),
            'SkillsLevels' => TypeLevel::all(),

        ]);
    }

    public function administracion(Request $request)
    {   
       
       
        $mensaje = session('msj');
        $Task_id = session('Task_id');

        $Task_id && session()->forget('Task_id');
       
        if (!$Task_id) {
            $Task_id =  $request->id;
        }

        if ($mensaje) {
            session()->forget('msj');
        }

        return Inertia::render('AdmTasks/Index', [
            'Tasks' => Task::with(['cliente', 'usuarioAsignado', 'tipo','clasificacion.impact'])->orderBy('created_at', 'desc')->get(),
            'TaskTypes' => TaskType::where('status', '1')->get(),
            'statusList' => TaskStat::select('id', 'name')->where('status', 1)->get(),
            'msj' => $mensaje,
            'Task_id' => $Task_id,
        ]);
    }

    public function panel(Request $request)
    {
        $mensaje = session('msj');
        Session::forget('msj');

        return Inertia::render('Panel/Index', [
            'msj' => $mensaje,
            'clientes' => User::where("rol_id", 2)->get(),

        ]);
    }
    
    public function modelo(Request $request)
    {

        
        
        $requisitos =  $request->input('requisitos');
        $prioridad =  $request->input('data.prioridad');

        $work_queue = \App\Models\Config::first()->work_queue /100;
        
        
        $usuarios = User::where("rol_id", 2)->with(['skills' => 
            function ($query) { $query->where('status', 1); },'Tasks.tipo'])->get();
        

        $data = [];


        foreach ($usuarios as $usuario) {

            $cola_trabajo = 0;
            foreach ($usuario->tasks as $tarea) {
                $cola_trabajo += $tarea->tipo->estimated_time;
            }

            $habilidades = [];         
            foreach ($requisitos as $requisito) {
                foreach ($requisito as $idHabilidad => $nivel) {
                    $habilidades[] = ($usuario->skills->where('skill_id', $idHabilidad)->first()->level ?? 0)/2;
                }
            }
            $data[] = [
                'id' => $usuario['id'],
                'habilidades' => $habilidades,
                'cola_trabajo' => ($cola_trabajo*((100-$prioridad)/100))*$work_queue,

            ];
        }    

              

        $requisitosTask = [];
        foreach ($requisitos as $requisito) {
            foreach ($requisito as $idHabilidad => $nivel) {
                $requisitosTask[] = $nivel;
            }
        }
        

        
        // Enviar los datos a un script de Python
        $response = Http::post('http://127.0.0.1:5000/calcular-exito', [
            'usuarios' => $data,
            'requisitos' => $requisitosTask,
        ]);


        // Obtener los resultados de vuelta del script de Python
        $resultados = $response->json();

       
        return response()->json($resultados);
       
    }

    public function create(Request $request)
    {   
            
        
        try {
           /*  $request->merge([
                // 'user_id' => Auth::user()->id,
                'status_id' => 1,
            ]);

            $validator = validator($request->all(), [
                'tipo_id' => 'exists:TaskTypes,id',
                'created_at' => 'date',
                'user_id' => 'exists:users,id',
                'status_id' => 'exists:estado_Tasks,id',
                'descripcion' => 'required',
            ], [
                'tipo_id.exists' => 'El tipo de Task seleccionado no es válido.',
                'user_id.exists' => 'El usuario seleccionado no es válido.',
                'descripcion.required' => 'La descripción es obligatoria.',
            ]); */
           /*  if ($validator->fails()) {
                session()->put('msj', ['error' => array_values($validator->errors()->messages())]);

                return back();
            }
            */
            $Task = Task::create($request->all());
            session()->put('msj', ["success" => 'Tarea creada Correctamente', "id" => $Task->id]);

        } catch (ModelNotFoundException $e) {
            session()->put('msj', ["error" => 'No se pudo registrar la Task'.$e]);
        } catch (QueryException $e) {

            $errormsj = $e->getMessage();

            if (strpos($errormsj, 'Duplicate entry') !== false) {
                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';
                if ($duplicateKey == 'Tasks_tipo_id_user_id_created_at_unique') {
                    $fecha = Carbon::parse(substr($duplicateValue, 4))->locale('es');
                    session()->put('msj', ["errord" => "Ya existe un bloque para " . $duplicateValue]);
                } else {

                    session()->put('msj', ["error" => "No se puede realizar la acción, el valor '$duplicateValue' está duplicado"], 422);
                }
            } else {
                session()->put('msj', ["error" => 'No se pudo registrar el Task'.$errormsj]);
            }
        } catch (Exception $e) {
            session()->put('msj', ["error" => 'Error en la accion realizada']);
        }

        
        return redirect('Tasks');
    }

    public function update(Request $request)
    {
        try {
            
            $mensajes = [
                'tipo_id' => 'El tipo de Task no existe.',
                'created_at' => 'La fecha de creacion no es valida.',
                'user_id' => 'El usuario no existe.',
                'status_id' => 'El estado seleccionado no existe.',
                'descripcion' => 'La descripcion no puede estar en blanco.',
            ];

            $validator = validator($request->all(), [

                'id' => 'required|exists:Tasks,id',
                'tipo_id' => 'exists:TaskTypes,id',
                'created_at' => 'date',
                'user_id' => 'exists:users,id',
                'status_id' => 'exists:estado_Tasks,id',
                'descripcion' => 'required',

            ], $mensajes);

           

            if ($validator->fails()) {

                session()->put('msj', ['error' => array_values($validator->errors()->messages())]);

                return back();


            }

           
            $Task = Task::findOrFail($request->id);
            $status_ant = TaskStat::find($Task->status_id);
            $status_act = TaskStat::find($request->status_id) ?? $status_ant;

            $request->merge([
                'Task_id' => $request->id,
                'status_ant' => $Task->status_id,
                'message' => "El estado de la Task No. $request->numero Ha cambiado de $status_ant->name a $status_act->name"
            ]);

            
            $Task->update($request->all());

            if (Auth::user()->rol_id == 3) {
                $Task->usuarioAsignado_id = Auth::user()->id;
            }
            
            $Task->save();

            if ($request->status_ant != $request->status_id) {
                // $log = new LogTaskController();
                // $respuesta = $log->create($request);

                $request->merge([
                    'descripcion' => "Se ha actualizado la Task ".$request->status_ant ."->". $request->status_id,
                ]);

                Notificacion::create(
                    [
                        'Task_id' => $request->id,
                        'emisor_id' => Auth::user()->id,
                        'receptor_id' => $request->user_id,
                        'message' => $request->message
                    ]
                );
            }

            if (isset($request->created_at)) {
                return redirect('panel')->with('msj', ['success' => 'Bloque actualizado correctamente']);
            }
           
            return redirect()->route('AdmTasks')
                ->with('msj', ['success' => 'Task actualizada correctamente'])
                ->with('Task_id', $request->id);
        } catch (ModelNotFoundException $e) {

            return redirect()->route('AdmTasks')->with('msj', ['error' => 'El Task ' . $request->id . ' no existe no fue encontrado'], 404);
        } catch (QueryException $e) {

            $errormsj = $e->getMessage();

            if (strpos($errormsj, 'Duplicate entry') !== false) {
                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';
                if ($duplicateKey == 'Tasks_tipo_id_user_id_created_at_unique') {
                    $fecha = Carbon::parse(substr($duplicateValue, 4))->locale('es');
                    session()->put('msj', ["errord" => "Ya existe un bloque para " . $duplicateValue]);
                } else {

                    session()->put('msj', ["error" => "No se puede realizar la acción, el valor '$duplicateValue' está duplicado"], 422);
                }
            } else {
                session()->put('msj', ["error" => 'No se pudo registrar el Task']);
            }
        }  catch (Exception $e) {

            return redirect()->route('AdmTasks')->with('msj', ['error' => 'Error en la acción realizada'], 500);
        }

        return back();
    }

    public function destroy($id)
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:Tasks,id'
        ]);

       if ($validator->fails()) {
                return redirect()->route('AdmTasks')->with('msj', ['error' => array_values($validator->errors()->messages())], 404);
            }

        try {
            $Task = Task::findOrFail($id)->load('files','notificaciones');

            
            if(auth()->user()->rol_id == 2){
               
                if(count($Task->files) == 0){
                    
                    $Task->notificaciones->each->delete();
                    $Task->delete();   

                    session()->put('msj', ["success" => 'Bloque eliminado correctamente']);
                   
                }else{
                    session()->put('msj', ["error" => 'No se puede eliminar la Task porque tiene archivos adjuntos']);
                   
                }
            } elseif(auth()->user()->rol_id == 1){

                $Task->files->each->delete();
                $Task->notificaciones->each->delete();
                $Task->delete();
                //eliminar todos los archivos relacionados a la Task   
        
            }

            return back();    
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Task ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'.$e], 500);
        }
    }
}