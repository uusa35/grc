import {ADD_TO_CART, REMOVE_FROM_CART , CLEAR_CART} from './../actions';
const initialState = {
    total: 0,
    netTotal: 0,
    discount: 0,
    totalWeight: 0,
    directPurchaseMode: false,
    totalItems: 0,
    items: []
}
export default function(cart = initialState
, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload;
        case REMOVE_FROM_CART:
            return action.payload;
        case CLEAR_CART:
            return initialState;
        default:
            return cart;
    }
}
