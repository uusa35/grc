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
        $roles = ['super', 'admin', 'designer', 'company', 'celebrity', 'client', 'driver'];
        $designerPrivileges = ['collection', 'order'];
        $companyPrivileges = ['product', 'slide', 'gallery', 'order', 'service', 'timing', 'video'];
        $adminPrivileges = ['product', 'slide', 'gallery', 'order', 'coupon', 'service', 'timing', 'setting', 'coupon', 'area', 'survey', 'question', 'result', 'questionnaire', 'answer',
            'country', 'currency', 'user', 'category', 'commercial', 'page', 'size', 'color', 'faq', 'day', 'collection', 'shipment', 'tag', 'brand', 'aboutus', 'video','addon','item'];
        $privileges = Privilege::all();
        foreach ($roles as $k => $v) {
            $role = Role::factory()->create(['name' => $v]);
            if ($role->name === 'super') {
                $role->update(['is_super' => $v === 'super' ? 1 : 0, 'is_admin' => true, 'name_ar' => $v, 'name_en' => $v]);
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                }
            } else if ($role->name === 'admin') {
                $role->update(['is_admin' => $v === 'admin' ? 1 : 0, 'is_admin' => true, 'name_ar' => $v, 'name_en' => $v]);
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                }
            } else if ($role->name === 'designer') {
                $role->update(['is_admin' => $v === 'admin' ? 1 : 0, 'is_visible' => true, 'is_designer' => true, 'name_ar' => $v, 'name_en' => $v]);
                $privileges = Privilege::whereIn('name', $designerPrivileges)->get();
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                }
            } else if ($role->name === 'celebrity') {
                $role->update(['is_admin' => $v === 'admin' ? 1 : 0, 'is_visible' => true, 'is_designer' => false, 'is_celebrity' => true, 'name_ar' => $v, 'name_en' => $v]);
                $privileges = Privilege::whereIn('name', $designerPrivileges)->get();
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                }
            } else if ($role->name === 'company') {
                $role->update(['is_admin' => $v === 'admin' ? 1 : 0, 'is_visible' => true, 'is_company' => true, 'name_ar' => $v, 'name_en' => $v]);
                $privileges = Privilege::whereIn('name', $companyPrivileges)->get();
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => true, 'view' => true, 'create' => true, 'update' => true, 'delete' => true]);
                }
            } else if ($role->name === 'client') {
                $role->update(['is_admin' => $v === 'admin' ? 1 : 0, 'is_visible' => true, 'is_company' => false, 'name_ar' => $v, 'name_en' => $v, 'is_client' => true]);
                $privileges = Privilege::whereIn('name', $companyPrivileges)->get();
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => false, 'view' => false, 'create' => false, 'update' => false, 'delete' => false]);
                }
            } else {
                $role->update(['is_admin' => $v === 'admin' ? 1 : 0, 'is_visible' => true, 'is_company' => false, 'name_ar' => $v, 'name_en' => $v, 'is_client' => true,'is_driver' => true]);
                $privileges = Privilege::whereIn('name', $companyPrivileges)->get();
                $role->privileges()->saveMany($privileges);
                $rolePrivileges = $role->privileges()->get();
                foreach ($rolePrivileges as $privilege) {
                    $privilege->roles()->updateExistingPivot($role->id, ['index' => false, 'view' => false, 'create' => false, 'update' => false, 'delete' => false]);
                }
            }
        }
    }
}
