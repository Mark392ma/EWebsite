<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeeInvoice extends Model
{ 
    use HasFactory;

    protected $table = 'invoices';

    protected $fillable = [
        'invoice_number',
        'student_id',
        'fee_setup_id',
        'amount_due',
        'description',
        'due_date',
    ];

    protected $casts = [
        'amount_due' => 'float',
        'due_date' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function feeSetup()
    {
        return $this->belongsTo(FeeSetup::class);
    }

     public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers (VERY useful)
    |--------------------------------------------------------------------------
    */

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    public function isPartial(): bool
    {
        return $this->status === 'partial';
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /*
    |--------------------------------------------------------------------------
    | Auto-calculate balance (optional but powerful)
    |--------------------------------------------------------------------------
    */

    protected static function booted()
    {
        static::saving(function ($invoice) {
            $invoice->balance = $invoice->amount_due - $invoice->amount_paid;

            if ($invoice->balance <= 0) {
                $invoice->status = 'paid';
            } elseif ($invoice->amount_paid > 0) {
                $invoice->status = 'partial';
            } else {
                $invoice->status = 'pending';
            }
        });
    }
}

