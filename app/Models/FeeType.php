<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'frequency',
    ];

    /**
     * FeeType → FeeSetups (one-to-many)
     */
    public function feeSetups()
    {
        return $this->hasMany(FeeSetup::class);
    }

    /**
     * FeeType ↔ FeeGroups (many-to-many)
     */
    public function feeGroups()
    {
        return $this->belongsToMany(FeeGroup::class, 'fee_group_type');
    }
}