import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './cart-dropdown.scss'
import Button from '../button/button'
import CartItem from '../cart-item/cart-item'
import { CartContext } from '../contexts/cart'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckout = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                { cartItems.map(item => <CartItem key={item.id} cartItem={item} />) }
            </div>
            <Button onClick={goToCheckout}>Checkout</Button>
        </div>  
    )
}

export default CartDropdown