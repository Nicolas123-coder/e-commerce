import { useContext, useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../components/contexts/categories'
import ProductCard from '../../components/product-card/product-card'
import './category.scss'

const Category = () => {
    const { category } = useParams()
    const { categories } = useContext(CategoriesContext)
    const [ products, setProducts ] = useState(categories[category])

    useEffect(() => {
        setProducts(categories[category])  // seta os produtos da categoria especificada no Useparams
    }, [category, categories])

    return ( 
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
    )
}

export default Category