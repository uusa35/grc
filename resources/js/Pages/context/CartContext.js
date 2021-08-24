import React, {useContext, createContext, useState} from "react";
import { remove } from 'lodash';
const initialState = {
    total: 0,
    netTotal: 0,
    discount: 0,
    totalWeight: 0,
    directPurchaseMode: false,
    totalItems: 0,
    items: []
}

const CartContext = createContext({
    cart: initialState,
});

const CartProvider = ({children}) => {
    const [cart, setCart] = useState(initialState);

    const addToCart = (item) => {
        return cart.items.push(item);
    }

    const removeFromCart = (itemId) => {
        return remove(cart.items, item => item.cart_id == itemId );
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export {CartProvider, CartContext};

