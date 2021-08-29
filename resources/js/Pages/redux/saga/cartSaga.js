import {toast} from "react-toastify";
import {capitalize} from "lodash";
import {translations} from "../../translations";
import {select, put} from 'redux-saga/effects';
import {CLEAR_CART, DISABLE_DIRECT_PURCHASE_MODE, SET_TOAST_MESSAGE} from "../actions/types";

export function* startAddToCartScenario(action) {
    try {
        // if (action.payload.direct_purchase || action.payload.type === 'subscription') {
        // yield put({ type : CLEAR_CART});
        // yield put({type: ADD_TO_CART, payload:  action.payload })
        // yield put({type: ENABLE_DIRECT_PURCHASE_MODE})
        // }
    } catch (e) {
    } finally {
        const {lang, cart } = yield select();
        if(cart.directPurchaseMode) {
            yield put({
                type: SET_TOAST_MESSAGE, payload: {
                    message: capitalize(translations[lang]['an_element_with_direct_purchase_mode_is_one_to_add_to_cart_u_have_to_clear_cart_first']),
                    type: 'error'
                }
            });
        } else {
            yield put({
                type: SET_TOAST_MESSAGE, payload: {
                    message: capitalize(translations[lang]['item_added_successfully']),
                    type: 'success'
                }
            });
        }
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
