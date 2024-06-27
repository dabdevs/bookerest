<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     *  Render index page
     */
    public function index()
    {
        $roles = Role::all()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'created_at' => $role->created_at->toIso8601String(), // Format date to ISO 8601 string
                'updated_at' => $role->created_at->toIso8601String(), // Format date to ISO 8601 string
            ];
        });

        return inertia('Roles', [
            'roles' => $roles,
        ]);
    }

    /**
     *  Store a new role
     */
    public function store(RoleRequest $request) 
    {
        try {
            Role::create(["name" => Str::lower($request->name)]);
            return redirect()->back()->with('success', 'Role created successfuly.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     *  Update existing row
     */
    public function update(RoleRequest $request)
    {
        try {
            $role = Role::findOrFail($request->id);

            $role->update($request->all());

            return redirect()->back()->with('success', 'Role updated successfuly.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     *  Delete existing row
     */
    public function destroy($id) 
    {
        try {
            Role::destroy($id);
            return redirect()->back()->with('success', 'Role deleted successfuly.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }
}
