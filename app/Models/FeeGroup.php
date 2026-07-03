<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeeGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'fee_type', // JSON field (optional use)
        'description',
    ];

    protected $casts = [
        'fee_type' => 'array', // auto-convert JSON → array
    ];

    /**
     * FeeGroup ↔ FeeTypes (many-to-many)
     */
    public function feeTypes()
    {
        return $this->belongsToMany(FeeType::class, 'fee_group_type');
    }

    /**
     * FeeGroup → FeeSetups (one-to-many)
     */
    public function feeSetups()
    {
        return $this->hasMany(FeeSetup::class);
    }

    /**
     * FeeGroup ↔ Students (many-to-many)
     */
    public function students()
    {
        return $this->belongsToMany(Student::class, 'fee_group_student');
    }
}