<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class feeController extends Controller
{
    public function report(Request $request)
    {
        $query = Fee::query();

        //Data range
        if ($request->from && $request->to){
            $query->whereBetween('due_date', [$request->from, $request->to]);
        }
        //class filter
        if($request->studentClass){
            $query->where('studentClass', $request->studentClass);
        }
        //Status filter
        if($request->status){
            $query->where('status', $request->status);
        }
        
        $fees = $query->get();

        return response()->json([ 
            'data' => $fees,
            'summary' => [
                'total_students' => $fees->count(),
                'total_fee' => $fees->sum('total_fee'),
                'collected' => $fees->sum('paid'),
                'panding' => $fees->sum('balance'),
                'overdue' => $fees-where('status', 'overdue')->sum('balance'),
            ],
            'status_breakdown' => [
                'paid' => $fees->where('status', 'paid')->count(),
                'partial' => $fees->where('status', 'partial')->count(),
                'overdue' => $fees->where('status', 'overdue')->count(),
            ]
        ]);
    }
}
