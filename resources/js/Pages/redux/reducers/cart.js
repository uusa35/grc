import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_DISCOUNT,
    SET_SHIPMENT_FEES,
    ENABLE_DIRECT_PURCHASE_MODE,
    DISABLE_DIRECT_PURCHASE_MODE, CHECK_CART_BEFORE_ADD, PREPARE_CART
} from './../actions/types';
import {sumBy, map, filter, round} from 'lodash';

const initialState = {
    total: 0,
    netTotal: 0,
    discount: 0,
    totalWeight: 0,
    shipmentFees: 0,
    totalItems: 0,
    directPurchaseMode: false,
    multiCartMerchant : true,
    applyGlobalShipment : false,
    currentShipmentCountry : {},
    items: [],
    merchants : [],
}
export default function(cart = initialState, action) {
    switch (action.type) {
        case PREPARE_CART :
            return  {
                ...cart,
                applyGlobalShipment : action.payload.applyGlobalShipment,
                multiCartMerchant: action.payload.multiCartMerchant,
                currentShipmentCountry: action.payload.currentShipmentCountry
            };
        case ADD_TO_CART: // item
            return {
                    ...cart,
                    items: action.payload.items,
                    total: round(parseFloat(sumBy(action.payload.items, 'price')), 2),
                    netTotal: round(parseFloat(sumBy(action.payload.items, 'price') - cart.discount + cart.shipmentFees), 2),
                    totalItems: parseInt(sumBy(map(action.payload.items, item => item.cart_id === action.payload.cart_id ? action.payload : item), 'qty')),
                    merchants : action.payload.merchants,
                }
        case REMOVE_FROM_CART: // only cart_id
            const items = filter(cart.items, item => item.cart_id !== action.payload);
            return {
                ...cart,
                items: filter(items, item => item.cart_id !== action.payload),
                total: round(parseFloat(sumBy(items, 'price')), 2),
                netTotal: round(parseFloat(sumBy(items, 'price') - cart.discount + cart.shipmentFees), 2),
                totalItems: parseInt(sumBy(map(items, item => item.cart_id === action.payload.cart_id ? action.payload : item), 'qty')),
                merchants: filter(items, i => i.merchant_id)
            };
        case SET_DISCOUNT : // only discount value
            return {
                ...cart,
                discount: action.payload,
                total: round(parseFloat(sumBy(cart.items, 'price')), 2),
                netTotal: round(parseFloat(sumBy(cart.items, 'price') - action.payload + cart.shipmentFees), 2),
            };
        case SET_SHIPMENT_FEES : // only shipmentFees value
            return {
                ...cart,
                total: round(parseFloat(sumBy(cart.items, 'price')), 2),
                netTotal: round(parseFloat(sumBy(cart.items, 'price') - action.payload + action.payload), 2),
                shipmentFees: round(parseFloat(action.payload.country.fixed_shipment_charge * cart.items.length), 2),
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
