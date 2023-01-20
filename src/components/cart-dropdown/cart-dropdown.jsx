import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import CartItem from '../cart-item/cart-item'
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()

    const goToCheckout = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems className='cart-items'>
                {
                    cartItems.length ? ( 
                        cartItems.map(item => <CartItem key={item.id} cartItem={item} />)  
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckout}>Checkout</Button>
        </CartDropdownContainer>  
    )
}

export default CartDropdown