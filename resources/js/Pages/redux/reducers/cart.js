import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_DISCOUNT,
    SET_SHIPMENT_FEES,
    ENABLE_DIRECT_PURCHASE_MODE,
    DISABLE_DIRECT_PURCHASE_MODE
} from './../actions/types';
import {sumBy, map, filter, uniqBy, concat, isInteger} from 'lodash';

const initialState = {
    total: 0,
    netTotal: 0,
    discount: 0,
    totalWeight: 0,
    shipmentFees: 0,
    directPurchaseMode: false,
    totalItems: 0,
    items: []
}
export default function(cart = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: // item
            const newItems = concat(filter(cart.items, item => item && item?.cart_id != action.payload.cart_id), action.payload);
            return cart.directPurchaseMode ? {...cart} :
                {
                    ...cart,
                    items: newItems,
                    total: parseFloat(sumBy(newItems, 'price')),
                    netTotal: parseFloat(sumBy(newItems, 'price') - cart.discount + cart.shipmentFees),
                    totalItems: parseInt(sumBy(map(newItems, item => item.cart_id === action.payload.cart_id ? action.payload : item), 'qty')),
                }
        case REMOVE_FROM_CART: // only cart_id
            const items = filter(cart.items, item => item.cart_id !== action.payload);
            return {
                ...cart,
                items: filter(items, item => item.cart_id !== action.payload),
                total: parseFloat(sumBy(items, 'price')),
                netTotal: parseFloat(sumBy(items, 'price') - cart.discount + cart.shipmentFees),
                totalItems: parseInt(sumBy(map(items, item => item.cart_id === action.payload.cart_id ? action.payload : item), 'qty')),
            };
        case SET_DISCOUNT : // only discount value
            return {
                ...cart,
                discount: action.payload,
                total: parseFloat(sumBy(cart.items, 'price')),
                netTotal: parseFloat(sumBy(cart.items, 'price') - action.payload + cart.shipmentFees),
            };
        case SET_SHIPMENT_FEES : // only shipmentFees value
            return {
                ...cart,
                total: parseFloat(sumBy(cart.items, 'price')),
                netTotal: parseFloat(sumBy(cart.items, 'price') - action.payload + action.payload),
                shipmentFees: parseFloat(action.payload * cart.items.length),
                totalWeight: parseFloat(sumBy(cart.items, 'weight')),
            };
        case ENABLE_DIRECT_PURCHASE_MODE :
            return {
                ...cart,
                items: [action.payload],
                directPurchaseMode: true,
                total: action.payload.price,
                netTotal: action.payload.price,
                totalItems: 1,
            };
        case DISABLE_DIRECT_PURCHASE_MODE:
                return initialState;
        case CLEAR_CART:
            return initialState;
        default:
            return cart;
    }
}
