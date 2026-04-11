<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentsController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

   
    Route::get('reports', function() {
        return Inertia::render('reports');
    })->name('reports');

    Route::get('/student', function(){
        return 'hello';
    });

    Route::get('/students', [StudentsController::class, 'index'])->name('students.index');
    Route::post('/students', [StudentsController::class, 'store'])->name('students.store');

    Route::get('/report', [feeController::class, 'report']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
