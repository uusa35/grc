<?php

namespace Database\Seeders;

use App\Models\Privilege;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['super', 'admin', 'company', 'author', 'client','designer', 'celebrity', 'driver'];
        $designerPrivileges = ['collection', 'order'];
        $companyPrivileges = ['product', 'slide', 'image', 'order', 'service', 'timing', 'video'];
        $adminPrivileges = ['product', 'slide', 'image', 'order', 'coupon', 'service', 'timing', 'setting', 'coupon', 'area', 'survey', 'question', 'result', 'questionnaire', 'answer',
            'country', 'currency', 'user', 'category', 'commercial', 'page', 'size', 'color', 'faq', 'day', 'collection', 'shipment', 'tag', 'brand', 'aboutus', 'video', 'addon', 'item'];
        $privileges = Privilege::all();
        foreach ($roles as $k => $v) {
            if ($v === 'super') {
                Role::factory(1)->create(['name' => $v, 'is_super' => $v === 'super' ? 1 : 0, 'is_admin' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else if ($v === 'admin') {
                Role::factory(1)->create(['name' => $v, 'is_admin' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else if ($v === 'designer') {
                Role::factory(1)->create(['name' => $v, 'is_designer' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else if ($v === 'celebrity') {
                Role::factory(1)->create(['name' => $v, 'is_celebrity' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else if ($v === 'company') {
                Role::factory(1)->create(['name' => $v, 'is_company' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else if ($v === 'author') {
                Role::factory(1)->create(['name' => $v, 'is_author' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else if ($v === 'client') {
                Role::factory(1)->create(['name' => $v, 'is_client' => true, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            } else {
                Role::factory(1)->create(['name' => $v, 'is_admin' => false, 'name_ar' => $v, 'name_en' => $v])->each(function ($role) use ($privileges) {
                    $role->privileges()->saveMany($privileges);
                    $rolePrivileges = $role->privileges()->get();
                    foreach ($rolePrivileges as $privilege) {
                        $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                    }
                });
            }
        }
    }
}
