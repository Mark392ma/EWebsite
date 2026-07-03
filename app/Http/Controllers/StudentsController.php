<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\FeeSetup;
use App\Models\FeeInvoice;

class StudentsController extends Controller 
{
    public function index() 
    {
        $students = Student::with(['studentClass', 'stream', 'invoices'])->paginate(10);

        $summary = [
                'totalStudents' => Student::count(),

                'totalFees' => (float) FeeSetup::sum('amount'),

                'totalCollected' => (float) FeeInvoice::sum('amount_paid'),

                'outstandingFees' => (float) FeeInvoice::sum('balance'),

                'overdueInvoices' => FeeInvoice::where('status', 'overdue')->count(),

                'collectedThisMonth' => (float) FeeInvoice::whereYear('created_at', now()->year)
                   ->whereMonth('created_at', now()->month)
                   ->sum('amount_paid'),

                'pendingPayments' => (float) FeeInvoice::where('status', 'pending')
                   ->sum('balance'),
            ];



        $students = $students->map(function ($student) {
            $totalFees = $student->invoices->sum('amount'); // was total_amount
            $paidFees = $student->invoices->sum(function($inv) {
                return $inv->amount - $inv->balance; // paid = amount - balance
            });
            $balance = $student->invoices->sum('balance'); // was paidFees calc

            $latestInvoice = $student->invoices->sortByDesc('due_date')->first();

            return [
                'id' => $student->id,
                'adm_no' => $student->adm_no,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'date_of_birth' => $student->date_of_birth,
                'class' => $student->studentClass?->class ?? '—', // column is 'class' not 'name'
                'stream' => $student->stream?->stream ?? '—', // column is 'stream' not 'name'
                'totalFees' => $totalFees,
                'phone_number' => $student->phone_number,
                'paidFees' => $paidFees,
                'balance' => $balance,
                'address'=> $student->address,
                'adm_date' => $student->created_at,
                'dueDate' => $latestInvoice?->due_date ?? null,
                'status' => $this->resolveStatus($student->invoices),
            ];
        });
        return Inertia::render('students', [
            'students' => $students
        ]);
    }

    public function show(Student $student)
    {
        $student->load(['studentClass', 'stream', 'invoices']);

        $totalFees = $student->invoices->sum('amount');
        $paidFees = $student->invoices->sum(fn($inv) => $inv->amount - $inv->balance);
        $balance = $student->invoices->sum('balance');
        $latestInvoice = $student->invoices->sortByDesc('due_date')->first();

        $payments = $student->invoices->map(fn($invoice) => [
            'id' => $invoice->id,
            'date' => optional($invoice->due_date)->format('d M Y'),
            'receipt' => $invoice->invoice_number ?? "INV-{$invoice->id}",
            'description' => $invoice->description ?? 'School Fees',
            'amount' => 'KES ' . number_format($invoice->amount, 0),
            'method' => $invoice->payment_method ?? 'N/A',
        ])->toArray();

        return Inertia::render('student-detail', [
            'student' => [
                'id' => $student->id,
                'adm_no' => $student->adm_no,
                'full_name' => $student->full_name,
                'first_name' => $student->first_name,
                'middle_name' => $student->middle_name,
                'last_name' => $student->last_name,
                'date_of_birth' => $student->date_of_birth,
                'gender' => $student->gender,
                'email' => $student->email,
                'phone_number' => $student->phone_number,
                'address' => $student->address,
                'class' => $student->studentClass?->class ?? '—',
                'stream' => $student->stream?->stream ?? '—',
                'status' => $student->status ?? 'active',
                'totalFees' => $totalFees,
                'paidFees' => $paidFees,
                'balance' => $balance,
                'dueDate' => $latestInvoice?->due_date?->format('d M Y') ?? 'N/A',
            ],
            'payments' => $payments,
        ]);
    }

    private function resolveStatus($invoices) 
    {
        if ($invoices->isEmpty()) return 'no-fees';
        if ($invoices->every(fn($i) => $i->status === 'paid')) return 'paid';
        if ($invoices->contains(fn($i) => $i->due_date && now()->gt($i->due_date) && $i->status !== 'paid')) return 'overdue';
        if ($invoices->contains(fn($i) => $i->status === 'partial')) return 'partial';
        return 'pending';
    }

    public function store(Request $request) 
    {
        $validated = $request->validate([
            'adm_no' => 'required|unique:students,adm_no',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'address' => 'nullable|string',
            'class_id' => 'nullable|exists:classes,id',
            'stream_id' => 'nullable|exists:streams,id',
        ]);

        Student::create($validated);
        return redirect()->back()->with('success', 'Student created successfully');
    }
}
