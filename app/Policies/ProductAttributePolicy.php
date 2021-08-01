<?php

namespace App\Policies;

use App\Models\ProductAttribute;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductAttributePolicy
{
    use HandlesAuthorization;
    const MODAL = 'product_attribute';

    /**
     * Determine whether the user can view the category.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->index : false;
    }

    /**
     * Determine whether the user can view the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\ProductAttribute $productAttribute
     * @return mixed
     */
    public function view(User $user, ProductAttribute $productAttribute)
    {
        dd('view');
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $productAttribute->product->user_id;
    }

    /**
     * Determine whether the user can create products.
     *
     * @param  \App\Models\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\ProductAttribute $productAttribute
     * @return mixed
     */
    public function update(User $user, ProductAttribute $productAttribute)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $productAttribute->product->user_id;
    }

    /**
     * Determine whether the user can delete the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\ProductAttribute $productAttribute
     * @return mixed
     */
    public function delete(User $user, ProductAttribute $productAttribute)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $productAttribute->product->user_id;
    }

    /**
     * Determine whether the user can restore the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\ProductAttribute $productAttribute
     * @return mixed
     */
    public function restore(User $user, ProductAttribute $productAttribute)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\ProductAttribute $productAttribute
     * @return mixed
     */
    public function forceDelete(User $user, ProductAttribute $productAttribute)
    {
        dd('force delete');
    }
}
