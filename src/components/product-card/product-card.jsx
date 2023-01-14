import { ProductCardContainer, Footer, Name, Price } from './product-card.styles.js'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product
    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)

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