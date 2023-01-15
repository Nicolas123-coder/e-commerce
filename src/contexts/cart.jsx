import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCardCount = cartItems.reduce((total, item) => total + item.quantity, 0)
        
        setCartCount(newCardCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
        
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    
    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove))
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

