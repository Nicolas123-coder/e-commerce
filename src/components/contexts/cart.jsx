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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCardCount = cartItems.reduce((total, item) => total + item.quantity, 0)
        
        setCartCount(newCardCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }
 
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}

