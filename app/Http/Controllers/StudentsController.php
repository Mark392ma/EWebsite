<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Students;
use App\Models\classes;
use App\Models\Stream;

class StudentsController extends Controller
{
    public function index(){
        $students = Students::all();

        return Inertia::render('students', [
            'students' => $students
            ]);
    }

    public function store(Request $request){

        //Find or Create Class or Stream
        //$class_id = classes::firstOrCreate(['name' => $request->input('class')]);
        //$stream_id = Stream::firstOrCreate(['name' => $request->input('stream')]);

        //Create student
        Students::create([
            'adm_no' => $request->input('adm_no'),
            'first_name' => $request->input('first_name'),
            'middle_name' => $request->input('middle_name'),
            'last_name' => $request->input('last_name'),
            'date_of_birth' => $request->input('date_of_birth'),
            'gender' => $request->input('gender'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'address' => $request->input('address'),
            'class_id' =>  $request->input('class_id'),
            'stream_id' =>  $request->input('stream_id'),
        ]);

      
       //Redirect or return response
       return response()->json(['success' => true, 'message' => 'Student created']);
    }
}
