<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\FeeInvoice;
use App\Models\FeeSetup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Cache for 60 seconds (adjust as needed)
        $data = Cache::remember('dashboard.data', 60, function () {

            /*
            |--------------------------------------------------------------------------
            | SUMMARY
            |--------------------------------------------------------------------------
            */
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

            

            /*
            |--------------------------------------------------------------------------
            | TREND (Last 6 Months)
            |--------------------------------------------------------------------------
            */
            $rawTrend = FeeInvoice::selectRaw("
                    DATE_FORMAT(created_at, '%Y-%m') as month,
                    SUM(amount_paid) as collected,
                    SUM(balance) as outstanding
                ")
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            $trend = $rawTrend->map(function ($item) {
                return [
                    'month' => date('M', strtotime($item->month)),
                    'collected' => (float) $item->collected,
                    'outstanding' => (float) $item->outstanding,
                ];
            });

            /*
            |--------------------------------------------------------------------------
            | PAYMENT BREAKDOWN (optional)
            |--------------------------------------------------------------------------
            */
            $breakdown = collect();

            // Only run if payments table exists
            if (DB::getSchemaBuilder()->hasTable('payments')) {
                $breakdown = DB::table('payments')
                    ->select('method', DB::raw('SUM(amount) as amount'))
                    ->groupBy('method')
                    ->get()
                    ->map(function ($item) {
                        return [
                            'method' => $item->method,
                            'amount' => (float) $item->amount,
                        ];
                    });
            }

            return [
                'summary' => $summary,
                'trend' => $trend,
                'breakdown' => $breakdown,
            ];
        });

        Log::info($data);
        
        return Inertia::render('dashboard', $data);
    }
}