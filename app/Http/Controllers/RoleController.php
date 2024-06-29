<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     *  Render role view
     */
    public function index()
    {
        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions,
                'created_at' => $role->created_at->toIso8601String(), 
                'updated_at' => $role->created_at->toIso8601String(), 
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
            $role = Role::create(["name" => Str::lower($request->name)]);

            return redirect()->back()->with(['extraData' => ['roleId' => $role->id], 'success' => 'Role created successfuly.']);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     *  Update existing role
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
     *  Delete existing role
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

    /**
     *  Add permission
     */
    public function addPermission($roleId, PermissionRequest $request)
    {
        try {
            $role = Role::findOrFail($roleId);
            $permission = $request->newPermission; 
            $newPermission = Permission::create(['name' => $permission]);
            $role->givePermissionTo($permission);
            return redirect()->back()->with(['extraData' => ['newPermission' => $newPermission], 'success' => 'Permission added successfuly.']);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     *  Remove permission
     */
    public function removePermission($roleId, Permission $permission)
    {
        try {
            $role = Role::findOrFail($roleId); dd($role);
            $role->permissions()->delete($permission->id);
            return redirect()->back()->with('success', 'Permission removed successfuly.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }
}
