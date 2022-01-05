import {addCartItemRequest, getCartItemsRequest} from "../services/cartService";
import {initiateGetUsers} from "./admin";

const GETTING_CART_ITEMS = 'GETTING_CART_ITEMS'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const GETTING_CART_ITEMS_FAILED = 'GETTING_CART_ITEMS_FAILED'
const ADDING_CART_ITEM = 'ADD_CART_ITEM'
const ADD_CART_ITEM_FAILURE = 'ADD_CART_ITEM_FAILURE'
const ADD_CART_ITEM_SUCCESS = 'ADD_CART_ITEM_SUCCESS'
const SET_QUANTITY = 'SET_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
const CLEAR_QUANTITY = 'CLEAR_QUANTITY'
const DELETE_CART_FAILED = 'DELETE_CART_FAILED'

const initialState = {
    cartItems: [],
    quantity: 0,
    gettingCartItems: false,
    addingCartItem: false,
    errorMessage: '',
    cartFailedMessage: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETTING_CART_ITEMS:
            return {
                ...state,
                gettingCartItems: true
            }
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                gettingCartItems: false,
                errorMessage: ''
            }

        case ADDING_CART_ITEM:
            return {
                ...state,
                addingCartItem: true,
            }

        case ADD_CART_ITEM_FAILURE:
            return {
                ...state,
                addingCartItem: false,
                errorMessage: action.payload
            }

        case ADD_CART_ITEM_SUCCESS:
            return {
                ...state,
                addingCartItem: false,
                errorMessage: ''
            }

        case GETTING_CART_ITEMS_FAILED:
            return {
                ...state,
                gettingCartItems: false,
                errorMessage: action.payload
            }

        case SET_QUANTITY:
            console.log(action.payload)
            return {
                ...state,
                quantity: action.payload
            }

        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        case CLEAR_QUANTITY:
            return {
                ...state,
                quantity: 0
            }

        case DELETE_CART_FAILED:
            return {
                ...state,
                cartFailedMessage: action.payload
            }

        default:
            return state
    }
}

//Action Creators

function gettingCartItems() {
    return {
        type: GETTING_CART_ITEMS
    }
}

function getCartItemsRequestFailed(message) {
    return {
        type: GETTING_CART_ITEMS_FAILED,
        payload: message
    }
}

function setCartItems(cartItems) {
    return {
        type: SET_CART_ITEMS,
        payload: cartItems
    }
}

function addingCartItem() {
    return {
        type: ADDING_CART_ITEM
    }
}

function addCartItemFailure(message) {
    return {
        type: ADD_CART_ITEM_FAILURE,
        payload: message
    }
}

function addCartItemSuccess() {
    return {
        type: ADD_CART_ITEM_SUCCESS
    }
}

function setQuantity(quantity) {
    return {
        type: SET_QUANTITY,
        payload: quantity
    }
}

function clearCart() {
    return {
        type: CLEAR_CART
    }
}

function clearQuantity() {
    return {
        type: CLEAR_QUANTITY
    }
}

function deleteCartFailed(message) {
    return {
        type: DELETE_CART_FAILED,
        payload: message
    }
}


//sideEffects
export function initiateGetCartItems() {
    return function gettingCartItemsSideEffect(dispatch, getState) {
        dispatch(gettingCartItems())

        getCartItemsRequest(getState().userReducer.loggedInUser.id).then(res => {
            if (res.status !== 200)
                return dispatch(getCartItemsRequestFailed(`Error getting cart items`))
            else {
                let quantity = 0
                dispatch(clearCart())
                for (let item of res.data) {
                    quantity += item.quantity
                    dispatch(setCartItems(item.product))
                }
                dispatch(setQuantity(quantity))
            }
        })
            .catch(err => console.log(`Error in initiateGetCartItems = ${err}`))
    }
}

export function initiateAddCartItem(productToAdd) {
    return function addCartItemSideEffect(dispatch, getState) {
        dispatch(addingCartItem())
        let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
        console.log(cartStorage)
        if (!getState().userReducer.isLoggedIn) {
            if (!cartStorage) {
                cartStorage = [productToAdd]
                window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))
            } else {
                cartStorage.push(productToAdd)
                window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))
            }
        } else {
            addCartItemRequest(productToAdd).then(res => {
                if (res.data !== 'success') {
                    return dispatch(addCartItemFailure(`Error adding item to cart`));
                } else {
                    console.log(res.data)
                    dispatch(addCartItemSuccess());
                    dispatch(initiateGetCartItems())
                }
            })
                .catch(err => console.log(`Error in initiateAddCartItem = ${err}`));
        }
    }
}

export function initiateDeleteCartItem(id) {
    console.log("deleting " + id)
    return function sideEffect(dispatch) {
        dispatch(clearCart())
        fetch(`http://localhost:8080/api/cart/delete`, {
            method: 'DELETE',
            headers: {
            "cartId": "cartIdValue",
            "productId": "productIdValue"
            },
        }).then(response => {
            if(!response.ok)
                return dispatch(deleteCartFailed())

            response.text().then(text => {
                if (text === 'success')
                   console.log("cart deleted!")
                else
                    dispatch(deleteCartFailed())
            })
        }).catch(error => console.log(error))
    }
}

