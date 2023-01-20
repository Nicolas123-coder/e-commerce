import { ShoppingIcon, CartIconContainer, ItemsCount } from './cart-icon.styles.js'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector.js'
import { setIsCartOpen } from '../../store/cart/cart.action.js'

const CartIcon = () => {
    const dispatch = useDispatch()
    
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    // Uma das formas de fazer a contagem dos items no carrinho

    // const numberOfItems = cartItems.reduce((result, item) => {
    //     return result + item.quantity
    // }, 0)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemsCount>{cartCount}</ItemsCount>
        </CartIconContainer>
    )
}

export default CartIcon