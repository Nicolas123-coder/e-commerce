import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.scss'
import { CartContext } from '../contexts/cart'
import { useContext } from 'react'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext) 

    // Uma das formas de fazer a contagem dos items no carrinho

    // const numberOfItems = cartItems.reduce((result, item) => {
    //     return result + item.quantity
    // }, 0)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon