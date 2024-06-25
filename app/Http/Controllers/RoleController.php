<?php

namespace App\Http\Controllers;

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
}
