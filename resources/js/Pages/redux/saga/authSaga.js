import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as requestSaga from './requestSaga';
import * as actions from './../actions/types'
import {first, isEmpty} from 'lodash'
import {SET_IS_ADMIN, SET_IS_AUTHOR, SET_IS_SUPER, SET_LOCALE, SET_SETTINGS, TOGGLE_GUEST} from "./../actions/types";

export function* startEnableAuthScenario(action) {
    try {
        if (!isEmpty(action.payload)) {
            const {role} = action.payload;
            yield all([
                put({type: SET_IS_ADMIN, payload: role.is_admin}),
                put({type: SET_IS_SUPER, payload: role.is_super}),
                put({type: SET_IS_AUTHOR, payload: role.is_author}),
                put({type: TOGGLE_GUEST, payload: isEmpty(role)}),
            ])
        }
    } catch (e) {
        console.log('e', e)
    }
}
