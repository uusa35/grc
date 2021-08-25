import {toast} from "react-toastify";
import {capitalize} from "lodash";
import {translations} from "../../Backend/translations";
import {select} from 'redux-saga/effects';

export function* startAddToCartScenario(action) {
    try {
    } catch (e) {
    } finally {
        const { lang } = yield select();
        toast.success(capitalize(translations[lang]['item_added_successfully']));
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
        console.log('the clear', action);

    } catch (e) {
        console.log('e', e)
    } finally {

    }
}
