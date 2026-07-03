<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
class Student extends Model
{
    use HasFactory;

    protected $fillable =[
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
        'status',
        'created_at',
    ];

    //Full name easily
    protected $appends = ['full_name'];

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => trim("{$this->first_name} {$this->middle_name} {$this->last_name}")
        );
    }
 
    public function studentClass()
    {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }

    public function stream()
    {
        return $this->belongsTo(Stream::class, 'stream_id');
    }

    public function invoices()
    {
        return $this->hasMany(FeeInvoice::class, 'student_id');
    }
}
