<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeAllocation extends Model
{
    protected $fillable = [
        'student_id',
        'fee_setup_id',
        'custom_amount',
        'amount',
        'date_assigned'
        ];

        protected $casts = [
            'date_assigned' => 'date',
            'custom_amount' => 'decimal:2',
            'amount' => 'decimal:2'
        ];

        public function student() {
            return $this->belongsTo(Student::class, 'student_id', 'id');
        }

        public function feeSetup()
        {
            return $this->belongsTo(FeeSetup::class, 'fee_setup_id', 'id');
        }
}
