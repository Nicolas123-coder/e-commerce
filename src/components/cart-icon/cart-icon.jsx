// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { ShoppingIcon, CartIconContainer, ItemsCount } from './cart-icon.styles.js'
import { CartContext } from '../../contexts/cart'
import { useContext } from 'react'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext) 

    // Uma das formas de fazer a contagem dos items no carrinho

    // const numberOfItems = cartItems.reduce((result, item) => {
    //     return result + item.quantity
    // }, 0)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemsCount>{cartCount}</ItemsCount>
        </CartIconContainer>
    )
}

export default CartIcon