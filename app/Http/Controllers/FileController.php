<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Notificacion;
use App\Models\Task;
use App\Models\User;
use App\Notifications\NewDocumentsNotification;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;


class FileController extends Controller
{

    public function upload(Request $request)
    {
        $mensajes = [
            'file.*.required' => 'No se ha seleccionado ningun archivo.',
            'file.*.file' => 'El archivo debe ser un archivo válido.',
            'file.*.mimes' => 'El archivo debe ser una imagen o un archivo PDF, Word o Exel.',
            'file.*.max' => 'El archivo no debe ser mayor de 2MB.',
            'file.*.uploaded' => 'El archivo no es valido.',
            'Task_id.exists' => 'La Task no existe.',
            // 'name.*.unique_name' => 'El name esta duplicado.',
        ];

        $validator = validator($request->all(), [
            'file.*' => 'required|file|mimes:xlsx,jpeg,jpg,png,docx,pdf|max:2048',
            'name.*' => 'required|unique_name',
            'Task_id' => 'required|exists:Tasks,id',
        ], $mensajes);

        if ($validator->fails()) {
            $formattedErrors = ["archivo_error" => [], "error" => [], "duplicados" => false];

            foreach ($validator->errors()->messages() as $key => $value) {

                if ($value[0] == "validation.unique_name") {
                    $index = substr($key, 7);
                    var_dump("name duplicado");
                    $name = $request->name[$index];
                    $formattedErrors["duplicados"] = true;
                    $formattedErrors["archivo_error"][] =  $name;
                } elseif (substr($key, 0, 4) == 'file') {
                    $index = substr($key, 5);
                    var_dump("file");
                    $name = $request->name[$index];
                    $formattedErrors["error"][] =  "(" . ($index + 1) . ")-> " . $value[0];
                    $formattedErrors["archivo_error"][] =  $name;
                } else {
                    $formattedErrors["error"][] = $value[0];
                }
            }

            session()->put('msj', ['error' => $formattedErrors]);

            if (Task::findOrFail($request->Task_id)->tipo_id < 3) {
                return redirect('panel');
            }

            return redirect('AdmTasks');
        }


        $mensajesExitosos = [];
        $mensajesErrores = null;

        try {
            $Task_numero = Task::findOrFail($request->Task_id)->numero;

            foreach ($request->file('file') as $index => $file) {

                if ($file->isValid()) {

                    try {
                        $extension = $file->getClientOriginalExtension();
                        $encryptedData = Crypt::encrypt(file_get_contents($file->getPathname()));

                        $referencia = time() . "_" . $index . $Task_numero;
                        $name = $referencia . "." . $extension;

                        $data = [
                            'name' => $request->name[$index],
                            'confidencial' => $request->confidencial[$index],
                            'Task_id' => $request->Task_id,
                            'referencia' => $referencia,
                            'extencion' => $extension,
                            'user_id' => Auth::user()->id,
                        ];

                        File::create($data);

                        Storage::disk('uploads')->put($name, $encryptedData);


                        //$file->storeAs('uploads', $name, 'public');

                        $mensajesExitosos[] = "Archivo " . $request->name[$index] . " subido con éxito.";
                    } catch (QueryException $e) {
                        $errormsj = $e->getMessage();

                        if (strpos($errormsj, 'Duplicate entry') !== false) {
                            preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                            $duplicateValue = $matches[1] ?? '';
                            $duplicateKey = $matches[2] ?? '';
                            $mensajesErrores[] = "Error al subir el archivo $duplicateValue: name duplicado";
                        } else {

                            $mensajesErrores[] = "Error al subir el archivo:";
                        }
                    } catch (\Exception $e) {
                        $mensajesErrores[] = "Error desconocido al subir el archivo :" . $e->getMessage();
                    }
                } else {
                    $mensajesErrores[] = "Error el archibo no es valido ";
                }
            }

            if ($mensajesErrores == null) {
                $mensajesExitosos = ["Todos los archivos subidos con exito"];
            }

            session()->put('msj', ['success' => $mensajesExitosos, 'error' => $mensajesErrores], 200);


            if ($mensajesExitosos) :
                $user_id = Task::find($request->Task_id)->user_id;
                $user = User::find($user_id);

                if (auth()->user()->rol_id == 2) :

                    $recipientEmail = 'contacto@Task Assignmentrd.com';

                    Notificacion::create(
                        [
                            'Task_id' => $request->Task_id,
                            'emisor_id' => Auth::user()->id,
                            'message' => "Has recibido un nuevo documentos en la Task: $Task_numero"
                        ]
                    );
                    $user->notify(new NewDocumentsNotification($recipientEmail, $Task_numero));

                else :

                    $recipientEmail = $user->email;

                    Notificacion::create(
                        [
                            'Task_id' => $request->Task_id,
                            'emisor_id' => Auth::user()->id,
                            'receptor_id' => $user_id,
                            'message' =>  "Has recibido un nuevos documentos en la Task: $Task_numero"
                        ]
                    );
                    $user->notify(new NewDocumentsNotification($recipientEmail, $Task_numero));
                endif;




            endif;
        } catch (\Exception $e) {
            session()->put('msj', ['error' => 'Error en la acción realizada ']);
        }

        if (Task::findOrFail($request->Task_id)->tipo_id < 3) {
            return redirect('panel');
        }

        return redirect('AdmTasks');
    }

    public function download(Request $request)
    {
        try {

            if (Auth::check()) {
                if (Auth::user()->rol_id != 2) {
                    $data = File::where('id', $request->id)->firstOrFail();
                } else {
                    $data = File::where('id', $request->id)->where('user_id', Auth::user()->id)->firstOrFail();
                };
            }
            $name = $data->referencia . '.' . $data->extencion;

            if (Storage::disk('uploads')->exists($name)) {

                $encryptedData = Storage::disk('uploads')->get($name);
                $file = Crypt::decrypt($encryptedData);

                $mimeType = Storage::disk('uploads')->mimeType($name);
                //Log::info('MIME Type del archivo: ' . $mimeType);

                return response($file, 200)
                    ->header('Content-Type', $mimeType)
                    ->header('Content-Disposition', 'attachment; filename="' . $name . '"');
            } else {
                //Log::error('Archivo no encontrado en el sistema de archivos');
                return response()->json(['error' => 'Archivo no encontrado'], 404);
            }
        } catch (ModelNotFoundException $e) {
            //Log::error('Archivo no encontrado en la base de datos');
            return response()->json(['error' => 'Archivo no encontrado en la base de datos'], 404);
        } catch (\Exception $e) {
            //Log::error('Error interno del servidor: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }

}
