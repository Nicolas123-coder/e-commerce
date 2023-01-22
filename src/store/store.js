import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean)

const composedEnhancer = 
    (process.env.NODE_ENV !== 'production' && 
        window && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
    compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares)) //podemos ter varios middlewares

// optional second param
export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
) 

export const persistor = persistStore(store)