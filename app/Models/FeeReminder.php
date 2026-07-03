<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeeReminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'fee_invoice_id',
        'title',
        'message',
        'channel',
        'status',
        'recipient_count',
        'scheduled_at',
        'sent_at',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    // If you have FeeInvoice model
    public function feeInvoice()
    {
        return $this->belongsTo(FeeInvoice::class);
    }

    // Helper scopes
    public function scopeSent($query)
    {
        return $query->where('status', 'sent');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}