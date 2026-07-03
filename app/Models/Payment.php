<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'fee_payments';

    protected $fillable = [
        'student_id',
        'fee_invoice_id',
        'payment_method',
        'amount',
        'payment_date',
        'receipt_number',
        'status'
    ];

    public function invoice()
    {
        return $this->belongsTo(FeeInvoice::class, fee_invoice_id);
    }

}
