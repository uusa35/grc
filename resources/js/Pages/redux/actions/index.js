import * as actions from './../actions/types'

export const addToCart = payload => ({
    type: actions.ADD_TO_CART,
    payload,
});

export const removeFromCart = payload => ({
    type: actions.REMOVE_FROM_CART,
    payload,
});

export const clearCart = payload => ({
    type: actions.CLEAR_CART,
    payload,
});

export const changeLang = payload => ({
    type: actions.SET_LANG,
    payload,
});

export const startBootStrapped = payload => ({
    type: actions.START_BOOTSTRAPPED,
    payload
});

export const setCurrency = payload => ({
    type: actions.SET_CURRENCY,
    payload,
});

export const setCurrencies = payload => ({
    type: actions.SET_CURRENCIES,
    payload,
});

export const setSettings = payload => ({
    type: actions.SET_SETTINGS,
    payload,
});

export const setModules = payload => ({
    type: actions.SET_MODULES,
    payload,
});
