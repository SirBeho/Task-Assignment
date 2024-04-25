<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskTypeController;
use App\Models\Config;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AuthenticatedSessionController::class, 'create']);

//funciones generales
Route::middleware(['auth', 'verified'])->group(function () {

    // Accesos
    Route::match(['get', 'post'], '/AdmTasks', [TaskController::class, 'administracion'])->name('AdmTasks');
    
    
    Route::get('/panel', [TaskController::class, 'panel'])->name('panel');
    Route::get('/notificaciones', [NotificacionController::class, 'index'])->name('notificaciones');
    Route::post('/notificaciones/{id}/{n_id}', [NotificacionController::class, 'update'])->name('notificaciones.update');

    
    Route::get('/home', function () {
        return Inertia::render('Home');
    })->name('home');

    Route::get('/AccessDenied', function () {
        return Inertia::render('AccessDenied');
    })->name('AccessDenied');
    
    //Funciones Basicas
    Route::post('upload', [FileController::class, 'upload'])->name('upload');
    Route::post('/download', [FileController::class, 'download'])->name('download');
    Route::post('/Tasks/create', [TaskController::class, 'create'])->name('Task.create');
    Route::post('/Tasks/update', [TaskController::class, 'update'])->name('Task.update');
    Route::post('/panel/destroy/{id}', [TaskController::class, 'destroy'])->name('Task.destroy');


    Route::post('/coment', [ComentarioController::class, 'create'])->name('comentario.create');
    Route::post('/coment4', [ComentarioController::class, 'destroy'])->name('comentario.destroy');

    //Funciones de Gestor
    Route::middleware(['checkrole:3'])->group(function () {
        
        Route::get('/reportes', [ReporteController::class, 'index'])->name('reportes');
        Route::post('/reportes/generar/soli', [ReporteController::class, 'Tasks_exel']);
        Route::post('/reportes/generar/docu', [ReporteController::class, 'documentos_exel']);
        Route::get('/dashboard', [ReporteController::class, 'dashboard'])->name('dashboard');

        Route::get('/configuracion', [ConfigController::class, 'index'])->name('config.index');
        Route::post('/configuracion', [ConfigController::class, 'update'])->name('config.update');
        Route::post('/TaskType/{id}', [TaskTypeController::class, 'update'])->name('TaskType.update');


        Route::get('/Tasks', [TaskController::class, 'index'])->name('Tasks');
        Route::post('/Asignar', [TaskController::class, 'modelo'])->name('TaskType.Asignar');

        
        //Funciones administrativas
        
            Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
            Route::post('/usuarios/{id}', [UserController::class, 'update'])->name('usuario.update');
            Route::post('/usuario/{id}', [UserController::class, 'destroy'])->name('usuario.delete');

        /*Route::get('/configuracion/servicios', [TaskTypeController::class, 'index'])->name('TaskType.index');*/
            Route::post('/configuracion/create', [TaskTypeController::class, 'create'])->name('TaskType.create');
            Route::post('/configuracion/delete/{id}', [TaskTypeController::class, 'destroy'])->name('TaskType.delete');

            Route::get('/reportes1', function () {
                return Inertia::render('Reportes/reporte_Tasks', [
                    'empresa' => Config::first(),
                ]);
            });
            Route::get('/reportes2', function () {
                return Inertia::render('Reportes/reporte_documentos', [
                    'empresa' => Config::first(),
                ]);
            });

            Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
        
        Route::middleware(['checkrole:1'])->group(function () {

        });
    });

   
});









Route::get('/form', function () {
    return Inertia::render('Form/Index');
})->name('form');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'delete'])
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
