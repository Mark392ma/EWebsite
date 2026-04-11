<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Students extends Model
{
    protected $fillable = [
        'adm_no',
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'gender',
        'email',
        'phone_number',
        'address',
        'class_id',
        'stream_id',
    ];
    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function studentClass(): BelongsTo 
    {
        return $this->belongsTo(StudentClass::class, class_id);
    }

    public function stream(): BelongsTo 
    {
        return $this->belongsTo(Stream::class);
    }
}
