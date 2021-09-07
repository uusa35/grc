import {toast} from "react-toastify";
import {capitalize, concat, filter, uniq, union} from "lodash";
import {translations} from "../../translations";
import {select, put, all} from 'redux-saga/effects';
import {ADD_TO_CART, CLEAR_CART, DISABLE_DIRECT_PURCHASE_MODE, SET_TOAST_MESSAGE} from "../actions/types";

export function* startCheckCartBeforeAdd(action) {
    try {
        const { cart , lang }  = yield select();
        const newItems = concat(filter(cart.items, item => item && item?.cart_id != action.payload.cart_id), action.payload);
        const merchants = union([action.payload.merchant_id],cart.merchants);
        // check if it already has item with directPurchase Model (like a subscription or a product with directPurchase)
        if(cart.directPurchaseMode && cart.items.length === 1) {
            throw capitalize(translations[lang]['an_element_with_direct_purchase_mode_is_one_to_add_to_cart_u_have_to_clear_cart_first']);
        }
        // check if not multi cart only items for single merchant
        else if(!cart.multiCartMerchant && merchants.length > 1) {
            throw capitalize(translations[lang]['this_cart_is_not_multi_you_can_not_buy_from_two_different_vendors']);
        } else {
            yield all([
                put({ type : ADD_TO_CART , payload : { items : newItems, merchants}}),
                 put({
                    type: SET_TOAST_MESSAGE, payload: {
                        message: capitalize(translations[lang]['item_added_successfully']),
                        type: 'success'
                    }
                })
            ])
        }
    } catch (e) {
        console.log('the e from check cart', e);
        yield put({
            type: SET_TOAST_MESSAGE, payload: {
                message: e,
                type: 'error'
            }
        });
    }
}

export function* startAddToCartScenario(action) {
    try {
        // if (action.payload.direct_purchase || action.payload.type === 'subscription') {
        // yield put({ type : CLEAR_CART});
        // yield put({type: ADD_TO_CART, payload:  action.payload })
        // yield put({type: ENABLE_DIRECT_PURCHASE_MODE})
        // }
    } catch (e) {
    } finally {
    }
}

export function* startEnableDirectPurchaseModelScenario(action) {
    try {
        // yield put({type: CLEAR_CART});
    } catch (e) {
    } finally {
        const {lang} = yield select();
        yield put({
            type: SET_TOAST_MESSAGE, payload: {
                message: capitalize(translations[lang]['item_added_successfully']),
                type: 'success'
            }
        });
    }
}


export function* startRemoveFromCartScenario(action) {
    try {

    } catch (e) {
    } finally {
        const {lang, cart} = yield select();
        toast.info(capitalize(translations[lang]['item_removed_successfully']));
        if(cart.directPurchaseMode) {
            yield put({ type : DISABLE_DIRECT_PURCHASE_MODE })
        }
    }
}


export function* startClearCartScenario(action) {
    try {

    } catch (e) {
        console.log('e', e)
    } finally {

    }
}
