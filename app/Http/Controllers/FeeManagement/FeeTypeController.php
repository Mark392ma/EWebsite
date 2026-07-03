<?php

namespace App\Http\Controllers\FeeManagement;

use App\Http\Controllers\Controller;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Inertia\Inertia;


class FeeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('fee-management/fees-type', [
            'feeTypes' => FeeType::latest()->get()
        ]);
        // return Inertia::render('fee-management/fee-type', [
        //     'feeTypes' => FeeType::latest()->get()
        // ]);
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
            'name'=>'required|string|max:255',
            'description'=>'nullable|string',
            'frequency'=>'required|in:one-time,monthly,termly,yearly',
        ]);

        FeeType::create($validated);
        return back()->with('success', 'Fee type created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FeeType $feeType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeeType $feeType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeeType $feeType) {
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'nullable|string',
            'frequency'=>'required|in:once,monthly,termly,yearly', // match DB enum
        ]);
        $feeType->update($validated);
        return back()->with('success', 'Fee type updated.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeeType $feeType)
    {
         $feeType->delete();
         return back()->with('success', 'Fee type deleted.');
    }
}
