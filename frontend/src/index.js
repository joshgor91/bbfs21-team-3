import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, combineReducers, createStore} from "redux"
import { Provider } from "react-redux"
import adminReducer from './modules/admin'
import userReducer from './modules/user'
import productsReducer from './modules/products'
import cartReducer from './modules/cart'
import shopkeeperReducer from './modules/shopkeeper'
import orderReducer from './modules/order'
import guestReducer from './modules/guest'
import couponReducer from './modules/coupon'


const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    next(action)
}


const middlewareEnhancer = applyMiddleware(asyncMiddleware)
const rootReducer = combineReducers({
    adminReducer,
    userReducer,
    productsReducer,
    cartReducer,
    shopkeeperReducer,
    orderReducer,
    guestReducer,
    couponReducer
})
const store = createStore(rootReducer, middlewareEnhancer)



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);