<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeeSetup extends Model
{
    use HasFactory;

    protected $fillable = [
        'fee_type_id',
        'fee_group_id',
        'academic_year',
        'amount',
        'due_date',
        'late_penalty',
    ];

    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }

    public function feeGroup()
    {
        return $this->belongsTo(FeeGroup::class);
    }
}