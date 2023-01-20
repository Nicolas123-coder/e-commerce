import { useEffect } from 'react'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'
import { setCategories } from '../../store/categories/category.action'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview'
import Category from '../category/category'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments() //retorna os objetos no banco em um objeto só
            
            dispatch(setCategories(categoriesArray))
        }

        getCategoriesMap()
    }, [])

    return (
       <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=':category' element={<Category />} />
       </Routes>
    )
}

export default Shop