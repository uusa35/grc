import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as requestSaga from './requestSaga';
import * as actions from './../actions/types'
import { first } from 'lodash'

export function* startEnableBootStrappedScenario(action) {
    try {
        const { currencies , settings , auth } = action.payload;
        yield all([
            put({ type : actions.SET_CURRENCIES, payload : currencies}),
            put({ type : actions.SET_CURRENCY, payload : first(currencies)}),
            put({ type : actions.SET_SETTINGS , payload : settings }),
            put({ type : actions.SET_AUTH , payload : auth}),
            put({ type : actions.DISABLE_LOADING }),
            put({ type : actions.ENABLE_BOOTSTRAPPED}),

        ])
    } catch (e) {
        console.log('e', e)
    }
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
