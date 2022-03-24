import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_DISCOUNT,
    REMOVE_DISCOUNT,
    SET_SHIPMENT_FEES,
    ENABLE_DIRECT_PURCHASE_MODE,
    DISABLE_DIRECT_PURCHASE_MODE, CHECK_CART_BEFORE_ADD,
    PREPARE_CART,
    SET_CART_ID
} from './../actions/types';
import {sumBy, map, filter, round, random} from 'lodash';

const initialState = {
    total: 0,
    netTotal: 0,
    discount: 0,
    totalWeight: 0,
    shipmentFees: 0,
    totalItems: 0,
    directPurchaseMode: false,
    multiCartMerchant: true,
    applyGlobalShipment: false,
    currentShipmentCountry: {},
    items: [],
    merchants: [],
    cartId: 0
}
export default function(cart = initialState, action) {
    switch (action.type) {
        case PREPARE_CART :
            return {
                ...cart,
                applyGlobalShipment: action.payload.applyGlobalShipment,
                multiCartMerchant: action.payload.multiCartMerchant,
                currentShipmentCountry: action.payload.currentShipmentCountry,
                shipmentFees:  action.payload.shipmentFees
            };
        case SET_CART_ID :
            return {
                ...cart,
                cartId: action.payload
            }
        case ADD_TO_CART: // item
            return {
                ...cart,
                items: action.payload.items,
                discount: 0,
                total: round(parseFloat(sumBy(action.payload.items, 'price')), 2),
                netTotal: round(parseFloat(sumBy(action.payload.items, 'price') + parseFloat(cart.shipmentFees)), 2),
                totalItems: parseInt(sumBy(map(action.payload.items, item => item.cart_id === action.payload.cart_id ? action.payload : item), 'qty')),
                merchants: action.payload.merchants,
            }
        case REMOVE_FROM_CART: // only cart_id
            const items = filter(cart.items, item => item.cart_id !== action.payload);
            return {
                ...cart,
                items: filter(items, item => item.cart_id !== action.payload),
                discount: 0,
                total: round(parseFloat(sumBy(items, 'price')), 2),
                netTotal: round(parseFloat(sumBy(items, 'price') + parseFloat(cart.shipmentFees)), 2),
                totalItems: parseInt(sumBy(map(items, item => item.cart_id === action.payload.cart_id ? action.payload : item), 'qty')),
                merchants: filter(items, i => i.merchant_id)
            };
        case SET_DISCOUNT : // only discount value
            const total = round(parseFloat(sumBy(cart.items, 'price')), 2);
            const couponValue = parseFloat(action.payload.is_percentage ? total * (action.payload.value / 100) : action.payload.value);
            return {
                ...cart,
                discount: couponValue,
                total,
                netTotal: round(parseFloat(total - couponValue + cart.shipmentFees), 2),
            };
        case REMOVE_DISCOUNT : // only discount value
            const currentTotal = round(parseFloat(sumBy(cart.items, 'price')), 2);
            return {
                ...cart,
                discount: 0,
                total: currentTotal,
                netTotal: round(parseFloat(currentTotal - 0 + cart.shipmentFees), 2),
            };
        case SET_SHIPMENT_FEES : // only shipmentFees value
            return {
                ...cart,
                total: round(parseFloat(sumBy(cart.items, 'price')), 2),
                netTotal: round(parseFloat(sumBy(cart.items, 'price') + action.payload), 2),
                shipmentFees: action.payload,
                totalWeight: round(parseFloat(sumBy(cart.items, 'weight')), 2),
                currentShipmentCountry: action.payload.country
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
