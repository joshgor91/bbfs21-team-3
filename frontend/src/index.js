import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, combineReducers, createStore} from "redux"
import { Provider } from "react-redux"

import userReducer from './modules/user'
import productsReducer from './modules/products'
import shopkeeperReducer from './modules/shopkeeper'


const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    next(action)
}


const middlewareEnhancer = applyMiddleware(asyncMiddleware)
const rootReducer = combineReducers({userReducer, productsReducer, shopkeeperReducer})
const store = createStore(rootReducer, middlewareEnhancer)



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);