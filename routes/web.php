<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeeManagement\FeeSetupController;
use App\Http\Controllers\FeeManagement\FeeTypeController;
use App\Http\Controllers\FeeManagement\FeeGroupController;
use App\Http\Controllers\FeeManagement\FeeAllocationController;
use App\Http\Controllers\FeeManagement\FeeInvoiceController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth'])->group(function () {
//     // Route::get('dashboard', function () {
//     //     return Inertia::render('dashboard');
//     // })->name('dashboard');
//     Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
   
//     Route::get('reports', function() {
//         return Inertia::render('reports');
//     })->name('reports');

//     Route::get('/students', [StudentsController::class, 'index'])->name('students.index');
//     Route::get('/students/{student}', [StudentsController::class, 'show'])->name('students.show');
//     Route::post('/students', [StudentsController::class, 'store'])->name('students.store');

//     Route::get('/report', [feeController::class, 'report']);
    
//     //fee managements routes
//     Route::get('/fee-management/fees-setup', [FeeSetupController::class, 'index'])->name('feeSetup.index');

//     Route::get('/fee-management/fees-type', [FeeTypeController::class, 'index'])->name('feeType.index');
//     Route::prefix('fee-management')->group(function(){
//         Route::resource('fees-type', FeeTypeController::class);
//     });

//     Route::get('/fee-management/fees-group', [FeeGroupController::class, 'index'])->name('feeGroup.index');

//     Route::get('/fee-management/fees-allocation', [FeeAllocationController::class, 'index'])->name('feeAllocation.index');
//     Route::post('/fee-management/fees-allocation', [FeeAllocationController::class, 'store'])->name('feeAllocation.store');


    
//     Route::get('/fee-management/fees-invoice', [FeeInvoiceController::class, 'index'])->name('feeInvoice.index');

//     Route::get('/fee-management/due-fees-invoice', function () {
//         $invoices = \App\Models\FeeInvoice::where('status', 'overdue')
//             ->with('student', 'feeSetup')
//             ->latest()
//             ->get()
//             ->map(function ($invoice) {
//                 return [
//                     'id' => $invoice->id,
//                     'invoiceNumber' => $invoice->invoice_number,
//                     'studentName' => $invoice->student?->name ?? 'N/A',
//                     'admissionNumber' => $invoice->student?->admission_number ?? 'N/A',
//                     'feeSetupName' => $invoice->feeSetup?->name,
//                     'amountDue' => $invoice->amount_due,
//                     'balance' => $invoice->balance,
//                     'dueDate' => $invoice->due_date,
//                     'status' => $invoice->status,
//                 ];
//             })
//             ->toArray();
//         return Inertia::render('fee-management/due-fees-invoice', ['invoices' => $invoices]);
//     });
    
//     Route::get('/fee-management/fees-reminders', function () {
//         $reminders = \App\Models\FeeReminder::latest()
//             ->get()
//             ->map(function ($reminder) {
//                 return [
//                     'id' => $reminder->id,
//                     'title' => $reminder->title,
//                     'message' => $reminder->message,
//                     'channel' => $reminder->channel, // sms/email/app
//                     'status' => $reminder->status, // pending/sent/failed
//                     'recipientCount' => $reminder->recipient_count,
//                     'sentAt' => $reminder->sent_at?->toDateString(),
//                 ];
//             });

//         return Inertia::render('fee-management/fees-reminder', [
//             'reminders' => $reminders
//         ]);
//     });

// });

Route::middleware(['auth'])->group(function () {
    
    Route::middleware(['role:Owner'])->prefix('owner')->group(function () {

        Route::get('/dashboard', function () {
            return inertia('owner/dashboard');
        })->name('owner.dashboard');

    });

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('reports', fn() => Inertia::render('reports'))->name('reports');
    Route::get('/students', [StudentsController::class, 'index'])->name('students.index');
    Route::get('/students/{student}', [StudentsController::class, 'show'])->name('students.show');
    Route::post('/students', [StudentsController::class, 'store'])->name('students.store');

    // Fee management - only use resource routes
    Route::prefix('fee-management')->group(function(){
        Route::resource('fees-type', FeeTypeController::class)->parameters([
            'fees-type' => 'feeType'
        ]);
        
        Route::resource('fees-setup', FeeSetupController::class);
        Route::resource('fees-group', FeeGroupController::class);
        Route::resource('fees-allocation', FeeAllocationController::class)->only(['index', 'store']);
        Route::resource('fees-invoice', FeeInvoiceController::class)->only(['index']);
    });

    Route::get('/fee-management/due-fees-invoice', function () {
        $invoices = \App\Models\FeeInvoice::where('status', 'overdue')
            ->with('student', 'feeSetup')
            ->latest()
            ->get()
            ->map(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'invoiceNumber' => $invoice->invoice_number,
                    'studentName' => $invoice->student?->name ?? 'N/A',
                    'admissionNumber' => $invoice->student?->admission_number ?? 'N/A',
                    'feeSetupName' => $invoice->feeSetup?->name,
                    'amountDue' => $invoice->amount_due,
                    'balance' => $invoice->balance,
                    'dueDate' => $invoice->due_date,
                    'status' => $invoice->status,
                ];
            })
            ->toArray();
        return Inertia::render('fee-management/due-fees-invoice', ['invoices' => $invoices]);
    });
    Route::get('/fee-management/fees-reminders', function () {
        $reminders = \App\Models\FeeReminder::latest()
            ->get()
            ->map(function ($reminder) {
                return [
                    'id' => $reminder->id,
                    'title' => $reminder->title,
                    'message' => $reminder->message,
                    'channel' => $reminder->channel, // sms/email/app
                    'status' => $reminder->status, // pending/sent/failed
                    'recipientCount' => $reminder->recipient_count,
                    'sentAt' => $reminder->sent_at?->toDateString(),
                ];
            });

        return Inertia::render('fee-management/fees-reminder', [
            'reminders' => $reminders
        ]);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


