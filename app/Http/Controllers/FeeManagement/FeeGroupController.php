<?php

namespace App\Http\Controllers\FeeManagement;

use App\Http\Controllers\Controller;
use App\Models\FeeGroup;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class FeeGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feeGroups = FeeGroup::latest()->get();
        $allFeeTypes =  FeeType::select('id','name', 'description','frequency')->get();

        Log::info($feeGroups->toArray());
        return Inertia::render('fee-management/fees-group', [
            'feeGroups' => $feeGroups,
            'allFeeTypes' => $allFeeTypes
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
            'name'=>'required|string|max:255',
            'description'=>'nullable|string',
            'fee_type_ids'=>'required|array|min:1',
            'fee_type_ids.*'=>'exists:fee_types,id',
        ]);

        $feeGroup = FeeGroup::create([
            'name'=> $validated['name'],
            'description'=>$validated['description'],
            'fee_type'=> [
                'includes' => $feeTypeNames,
                'optional' => false
            ]
        ]);

        $feeGroup->feeTypes()->attach($validated['fee_type_ids']);

        return back()->with('success', 'Fee group created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FeeGroup $feeGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeeGroup $feeGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeeGroup $feeGroup)
    {
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'nullable|string',
            'fee_type-ids'=>'required|array|min:1',
            'fee_type-ids.*'=>'exists:fee_types,id',
        ]);

        $feeTypeNames = FeeType::whereIn('id', $validated['fee_types_ids'])->pluck('name')->toArray();

        $feeGroup->update([
            'name'=> $validated['name'],
            'description'=>$validated['description'],
            $validated['description'],
            'fee_type' => [
                'includes' => $feeTypeNames,
                'optional' => false
            ]
        ]);

        //$feeGroup->feeTypes()->sync($validated['fee_type_ids']);

        return back()->with('success', 'Fee group updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeeGroup $feeGroup)
    {
        $feeGroup->delete();
        return back()->with('success', 'Fee group deleted.');

    }
}
