import { createContext, useState, useEffect} from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.js";

export const CategoriesContext = createContext({
    categories: {},
})

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()

            console.log('opa : ',categoryMap)  //retorna os objetos no banco em um objeto só
            setCategories(categoryMap)
        }

        getCategoriesMap()
    }, [])

    const value = { categories }

    return (
        <CategoriesContext.Provider value={value}> { children } </CategoriesContext.Provider>
    )
}
