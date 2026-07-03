<?php

namespace App\Http\Controllers\FeeManagement;

use App\Http\Controllers\Controller;
use App\Models\FeeSetup;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class FeeSetupController extends Controller
{
    public function index()
    {
        $feeSetups = FeeSetup::with(['feeType', 'feeGroup'])
            ->latest()
            ->get()
            ->map(function ($setup) {
                return [
                    'id' => $setup->id,
                    'feeTypeId' => $setup->fee_type_id,
                    'feeTypeName' => $setup->feeType?->name,
                    'feeGroupName' => $setup->feeGroup?->name,
                    'academicYear' => $setup->academic_year,
                    'term' => $setup->term,
                    'amount' => $setup->amount,
                    'dueDate' => $setup->due_date,
                    'latePenalty' => $setup->late_penalty,
                ];
            });

        Log::debug($feeSetups);
        // return Inertia::render('fee-management/fees-setup');    
        return Inertia::render('fee-management/fees-setup', [
            'feeSetups' => $feeSetups
        ]);
    }
}