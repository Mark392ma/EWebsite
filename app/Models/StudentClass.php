<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class StudentClass extends Model
{
    use HasFactory;

    protected $table = "classes";
    protected $fillable = ['class'];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'class_id');
    }
}
