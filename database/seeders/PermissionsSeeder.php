<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'create admins']);
        Permission::create(['name' => 'read admins']);
        Permission::create(['name' => 'edit admins']);
        Permission::create(['name' => 'delete admins']);

        Permission::create(['name' => 'create members']);
        Permission::create(['name' => 'read members']);
        Permission::create(['name' => 'edit members']);
        Permission::create(['name' => 'delete members']);

        Permission::create(['name' => 'create books']);
        Permission::create(['name' => 'read books']);
        Permission::create(['name' => 'edit books']);
        Permission::create(['name' => 'delete books']);
        Permission::create(['name' => 'publish books']);
        Permission::create(['name' => 'unpublish books']);

        // create super admin role and assign existing permissions
        $superAdminRole = Role::create(['name' => 'super-admin']);
        $superAdminRole->givePermissionTo('create admins');
        $superAdminRole->givePermissionTo('read admins');
        $superAdminRole->givePermissionTo('edit admins');
        $superAdminRole->givePermissionTo('delete admins');

        $superAdminRole->givePermissionTo('create members');
        $superAdminRole->givePermissionTo('read members');
        $superAdminRole->givePermissionTo('edit members');
        $superAdminRole->givePermissionTo('delete members');

        $superAdminRole->givePermissionTo('create books');
        $superAdminRole->givePermissionTo('read books');
        $superAdminRole->givePermissionTo('edit books');
        $superAdminRole->givePermissionTo('delete books');
        $superAdminRole->givePermissionTo('publish books');
        $superAdminRole->givePermissionTo('unpublish books');

        // create admin role and assign existing permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo('create members');
        $adminRole->givePermissionTo('read members');
        $adminRole->givePermissionTo('edit members');
        $adminRole->givePermissionTo('delete members');

        $adminRole->givePermissionTo('create books');
        $adminRole->givePermissionTo('read books');
        $adminRole->givePermissionTo('edit books');
        $adminRole->givePermissionTo('delete books');
        $adminRole->givePermissionTo('publish books');
        $adminRole->givePermissionTo('unpublish books');

        // create member role and assign existing permissions
        $memberRole = Role::create(['name' => 'member']);
        $memberRole->givePermissionTo('create books');
        $memberRole->givePermissionTo('read books');
        $memberRole->givePermissionTo('edit books');
        $memberRole->givePermissionTo('delete books');
        $memberRole->givePermissionTo('publish books');
        $memberRole->givePermissionTo('unpublish books');

        // create super admin user
        $superAdmin = \App\Models\User::factory()->create([
            'name' => 'Super-Admin User',
            'email' => 'super-admin@bookerest.com',
        ]);
        $superAdmin->assignRole($superAdminRole);

        // create admin user
        $admin1 = \App\Models\User::factory()->create([
            'name' => 'Admin1 User',
            'email' => 'admin1@bookerest.com',
        ]);
        $admin1->assignRole($adminRole);

        $admin2 = \App\Models\User::factory()->create([
            'name' => 'Admin2 User',
            'email' => 'admin2@bookerest.com',
        ]);
        $admin2->assignRole($adminRole);
    }
}
