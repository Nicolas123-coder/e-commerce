// faz o memoization, que é quando uma função é chamada mais de uma vez com os mesmos
// parametros, na segunda vez que ela é chamada ela vai usar o retorno 'memorizado' da primeira vez
// isso é para não gastas recursos a mais calculando o q ja foi calculado
import { createSelector } from "reselect"

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
        categories.reduce((accumulator, category) => {
            const { title, items } = category
            accumulator [title.toLowerCase()] = items
        
            return accumulator
        }, {})
) 

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)