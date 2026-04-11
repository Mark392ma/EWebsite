<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class classes extends Model
{
    protected $fillable = ['name'];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'class_id');
    }
}
