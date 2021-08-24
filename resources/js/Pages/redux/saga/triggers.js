import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as cartSaga from './cartSaga';
import * as actions from './../actions/types'
import * as requestSaga from "./requestSaga";
import * as authSaga from "./authSaga";

export function* triggerAddToCart() {
    yield takeLatest(actions.ADD_TO_CART, cartSaga.startAddToCartScenario);
}

export function* triggerRemoveFromCart() {
    yield takeLatest(actions.REMOVE_FROM_CART, cartSaga.startRemoveFromCartScenario);
}

export function* triggerClearCart() {
    yield takeLatest(actions.CLEAR_CART, cartSaga.startClearCartScenario);
}

export function* triggerChangeLang() {
    yield takeLatest(actions.SET_LANG, requestSaga.startChangeLangScenario);
}

export function* triggerStartBootStrapped() {
    yield takeLatest(actions.START_BOOTSTRAPPED, requestSaga.startEnableBootStrappedScenario);
}

export function* triggerSetAuth() {
    yield takeLatest(actions.SET_AUTH, authSaga.startEnableAuthScenario);
}
