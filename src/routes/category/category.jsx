import { useContext, useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/category.selector'
import ProductCard from '../../components/product-card/product-card'
import { CategoryContainer, Title } from './category.styles.js'

const Category = () => {
    const categories = useSelector(selectCategoriesMap)

    const { category } = useParams()
    const [ products, setProducts ] = useState(categories[category])

    useEffect(() => {
        setProducts(categories[category])  // seta os produtos da categoria especificada no Useparams
    }, [category, categories])

    return ( 
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category