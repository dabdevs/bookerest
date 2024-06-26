<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
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

    public function update(RoleRequest $request)
    {
        try {
            $role = Role::findOrFail($request->id);

            $role->update($request->all());

            return redirect()->back()->with('success', 'Role updated successfuly.');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
