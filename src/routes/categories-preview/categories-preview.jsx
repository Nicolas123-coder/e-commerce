import { useContext, Fragment } from "react"
import { CategoriesContext } from "../../contexts/categories"
import CategoryPreview from "../../components/category-preview/category-preview"

const CategoriesPreview = () => {
    const { categories } = useContext(CategoriesContext)
    console.log(categories)

    return (
        <Fragment>
          {
            Object.keys(categories).map((title) => {
              const products = categories[title]
              return (<CategoryPreview key={title} title={title} products={products}/>)
            })
          }
        </Fragment>
    )
}

export default CategoriesPreview