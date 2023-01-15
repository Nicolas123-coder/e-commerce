import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase";
import { createAction } from "../utils/reducer/reducer";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

//TODO: Transformar isso num enum depois juntos com od demais casos
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

// insted using usestate we use reducer
const userReducer = (state, action) => {
    console.log('rodou')
    console.log(action)
    const { type, payload } = action

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default: 
            throw new Error(`Unhandled type ${type} in userReducer`) 
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    console.log(currentUser)

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    const value = {
        currentUser, setCurrentUser
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unsubscribe
    }, []) // [] só roda quando o componente montar

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

