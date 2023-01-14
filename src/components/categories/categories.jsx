import { CategoriesContainer } from './categories.styles.js'
import CategoryItem from '../category-item/category-item'

const Categories = ({ categories }) => {
  return (
    <CategoriesContainer>
      { categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
      ))}
    </CategoriesContainer>
  )
}

export default Categories