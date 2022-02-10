import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from './../actions/types'
import {first} from 'lodash'
import {toast} from "react-toastify";
import axios from "axios";

export function* startEnableBootStrappedScenario(action) {
    try {
        const translations = yield call(getTranslations);
        const {currencies , theme } = action.payload;
        yield all([
            put({type: actions.SET_CURRENCIES, payload: currencies}),
            put({type: actions.SET_CURRENCY, payload: first(currencies)}),
            // put({type: actions.SET_SETTINGS, payload: settings}),
            put({type: actions.SET_THEME, payload: theme}),
            put({type: actions.SET_TRANSLATIONS, payload: translations}),
            put({type: actions.DISABLE_LOADING}),
            put({type: actions.ENABLE_BOOTSTRAPPED}),
        ])
    } catch (e) {
        console.log('e', e)
    }
}

export async function getTranslations() {
    return await axios.get(`/api/translations`).then(r => r.data).catch(e => console.log(e));
}

export function* startChangeLangScenario(action) {
    try {
        const isRTL = action.payload === 'ar'
        if (action.payload === 'ar') {
            yield put({
                type: actions.SET_LOCALE,
                payload: {
                    isRTL,
                    dir: 'rtl',
                    otherLang: 'en'
                }
            })
        } else {
            yield put({
                type: actions.SET_LOCALE,
                payload: {
                    isRTL,
                    dir: 'ltr',
                    otherLang: 'ar'
                }
            });
        }


    } catch (e) {
        console.log('e', e)
    } finally {

    }
}


export function* startToastMessageScenario(action) {
    try {
        toast(action.payload.message, {type: action.payload.type})
    } catch (e) {
        console.log('e', e)
    } finally {
        yield delay(5000);
        yield  put({type: actions.CLEAR_TOAST_MESSAGE});
    }
}
