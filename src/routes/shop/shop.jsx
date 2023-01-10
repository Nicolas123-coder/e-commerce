import { useContext, Fragment } from "react"
import { CategoriesContext } from "../../components/contexts/categories"
import './shop.scss'
import ProductCard from '../../components/product-card/product-card'

const Shop = () => {
    const { categories } = useContext(CategoriesContext)
    console.log(categories)

    return (
        <Fragment>
            {
                    Object.keys(categories).map((title) => (
                        <Fragment key={title}>
                            <h2>{title}</h2>
                            <div className='products-container'>
                                {categories[title].map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </Fragment>
                    ))}
        </Fragment>
    )
}

export default Shop