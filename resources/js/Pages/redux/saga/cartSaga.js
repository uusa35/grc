import {toast} from "react-toastify";
import {capitalize} from "lodash";
import {translations} from "../../translations";
import {select, put} from 'redux-saga/effects';
import { SET_TOAST_MESSAGE } from "../actions/types";

export function* startAddToCartScenario(action) {
    try {
    } catch (e) {
    } finally {
        const { lang } = yield select();
        yield put({ type : SET_TOAST_MESSAGE, payload : {
            message : capitalize(translations[lang]['item_added_successfully']),
                type : 'success'
        }});
    }
}


export function* startRemoveFromCartScenario(action) {
    try {

    } catch (e) {
    } finally {
        const { lang } = yield select();
        toast.info(capitalize(translations[lang]['item_removed_successfully']));
    }
}


export function* startClearCartScenario(action) {
    try {

    } catch (e) {
        console.log('e', e)
    } finally {

    }
}
