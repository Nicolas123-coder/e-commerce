import { compose, applyMiddleware, createStore } from "redux";
// import { legacy_createStore as createStore } from "redux"
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleWares = [logger]
const composedEnhancers = compose(applyMiddleware(...middleWares)) //podemos ter varios middlewares

// optional second param
export const store = createStore(rootReducer, undefined, composedEnhancers) 
