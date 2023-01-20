import { createAction } from "../../utils/reducer/reducer"
import { CART_ACTION_TYPES } from "./cart.types"

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

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)

}

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}