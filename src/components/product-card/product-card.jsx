import { ProductCardContainer, Footer, Name, Price } from './product-card.styles.js'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action.js'
import { selectCartItems } from '../../store/cart/cart.selector.js'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return (
        <ProductCardContainer className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer className='footer'>
                <Name className='name'>{name}</Name>
                <Price className='price'>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}> 
                Add to Cart
            </Button>
        </ProductCardContainer>
    )
}

export default ProductCard