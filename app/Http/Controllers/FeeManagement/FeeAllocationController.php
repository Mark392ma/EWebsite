<?php

namespace App\Http\Controllers\FeeManagement;

use App\Http\Controllers\Controller;
use App\Models\FeeAllocation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\FeeSetup;


class FeeAllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $allocations = FeeAllocation::with([
            'student:id,adm_no,first_name,middle_name,last_name,class_id', 'feeSetup:id,fee_type_id'
            ])
            ->when($request->search,fn($q)=> $q->whereHas('student', function($q) use($request) { $q->where('first_name', 'like', "%{$request->search}%")->orWhere('middle_name', 'like', "%{$request->search}") ->orWhere('adm_no', 'like', "%{$request->search}%");}))
            ->latest('date_assigned')
            ->paginate(15);

            return Inertia::render('fee-management/fees-allocation', [
            'allocations'=> $allocations->through(fn($a) => [
                    'id' => $a->id,
                    'student_name' => $a->student->full_name ?? $a->student->first_name,
                    'adm_no' => $a->student->adm_no,
                    'fee_setup_name' => $a->feeSetup->fee_type_id ?? 'Deleted Fee setup',
                    'custom_amount' => $a->custom_amount,
                    'date_assigned' => $a->created_at->format('Y-m-d'),
                ]),
            'students' => Student::select('id', 'first_name', 'middle_name', 'last_name', 'adm_no', 'class_id')->get(),
            'fee_setups' => FeeSetup::select('id', 'fee_type_id', 'amount')->get(),
            'filters' =>$request->only(['search']),
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
        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids,*' => 'exists:students,id',
            'fee_setup_id' => 'required|exists:fee_setups,id',
            'custom_amount' =>'nullable|numeric|min:0',
        ]);

        $feeSetup = FeeSetup::find($validated['fee_setup_id']);
        foreach($validated['student_ids'] as $studentId) {
            FeeAllocation::create([
                'student_id' => $studentId,
                'fee_setup_id' => $validated['fee_setup_id'],
                'custom_amount' => $validated['custom_amount'] ?? null,
                'amount' => $validated['custom_amount'] ?? $feeSetup->amount,
                'date_assigned' => now(),
            ]);

        }

            return back()->with('success', 'Fee allocated successfully');

        
    }

    /**
     * Display the specified resource.
     */
    public function show(FeeAllocation $feeAllocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeeAllocation $feeAllocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeeAllocation $feeAllocation)
    {
        $validated = $request->validate([
            'custom_amount' => 'required|numeric|min:0',
        ]);

        $feeAllocation->update([
            'custom_amount' => $validated['custom_amount'],
            'amount' => $validated['custom_amount'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeeAllocation $feeAllocation)
    {
        $feeAllocation->delete();
        return back()->with('success', 'Allocation removed');
    }
}
