<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees);
    }
    public function view(Request $request, $id)
    {
        $employee = Employee::find($id);
        return response()->json($employee);
    }
    public function store(Request $request)
    {
        $employee = new Employee([
            'Name'=> $request->input('Name'),
            'Address'=> $request->input('Address'),
            'Phone'=> $request->input('Phone')
        ]);
        $employee->save();
        return response()->json("Employee Created!");
    }
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        $employee->update($request->all());
        return response()->json('Employee Updated!');
    }
    public function delete(Request $request, $id)
    {
        $employee = Employee::find($id);
        $employee->delete();
        return response()->json("Employee Deleted!");
    }
}
