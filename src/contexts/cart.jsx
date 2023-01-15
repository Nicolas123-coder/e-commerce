import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer";

const addCartItem = (cartItems, productToAdd) => {
    // ver se o CartItems tem o productToAdd
    const existingItem = cartItems.find(
        (item) => item.id === productToAdd.id
    )

    // se tiver aumenta a quantidade se não deixa igual
    if(existingItem) {
        return cartItems.map(
            (item) => item.id === productToAdd.id ?
                {...item, quantity: item.quantity + 1}
                : item
        )
    }

    // se não coloca e retorna um array
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    // procurar o produto p remover no array
    const existingItem = cartItems.find(
        (item) => item.id === productToRemove.id
    )

    // ver se a quantidade é 1 e remover o produto do array
    if(existingItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== productToRemove.id)
    }

    //retornar o array com a quantidade reduzida
    return cartItems.map(
        (item) => item.id === productToRemove.id 
            ? {...item, quantity: item.quantity - 1}
            : item
    )
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

//TODO: importar isso em um enum
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case 'SET_CART_ITEMS': 
            return {
                ...state,
                ...payload
            }

        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload
            }


        default: 
            throw new Error(`Unhandled type ${type} in cartReducer`) 
    }
}

export const CartProvider = ({children}) => {
    //inicializa o reducer
    const [ { cartItems, isCartOpen, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCardCount = newCartItems.reduce((total, item) => total + item.quantity, 0)

        const newCartTotal = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0)

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems:  newCartItems, 
                cartTotal: newCartTotal,
                cartCount: newCardCount
            }))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }
    
    const removeItemToCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = clearCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        return dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        cartItems, 
        cartCount,
        clearItemFromCart,
        cartTotal
    }
 
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}

