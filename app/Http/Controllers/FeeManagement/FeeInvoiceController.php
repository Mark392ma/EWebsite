<?php

namespace App\Http\Controllers\FeeManagement;

use App\Http\Controllers\Controller;
use App\Models\FeeInvoice;
use App\Models\Student;
use App\Models\FeeSetup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class FeeInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = FeeInvoice::with(['student', 'feeSetup'])
        ->withSum('payments', 'amount')
        ->latest()
        ->get()
        ->map(function ($inv) {
            $paid = (float)$inv->payments_sum_amount ?? 0;
            $balance = max(0, $inv->amount_due - $paid);
            $status = $balance == 0 ? 'paid': ($paid > 0 ? 'partial' : ($inv->due_date < now() ? 'overdue' : 'unpaid'));

            return [
                'id' => $inv->id,
                'invoiceNumber' => $inv->invoice_number,
                'studentName' => $inv->student->name ?? 'N/A',
                'admissionNumber' => $inv->student->admission_no ?? 'N/A',
                'feeSetName' => $inv->feeSetup->name ?? 'Custom',
                'amountDue' => (float)$inv->amount_due,
                'amountpaid' => $paid,
                'balance' => (float)$balance,
                'dueDate' => $inv->due_date->format('Y-m-d'),
                'status' => $status,
            ];
        });

        return Inertia::render('fee-management/fees-invoice', [
            'invoices' => $invoices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FeeInvoice $feeInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeeInvoice $feeInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeeInvoice $feeInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeeInvoice $feeInvoice)
    {
        //
    }
}
