import {addCartItemRequest, editCartRequest, getCartItemsRequest} from "../services/cartService";
import {editCategoryRequest} from "../services/categoryService";
import {initiateGetCategories, initiateGetProducts} from "./shopkeeper";

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
const UPDATE_CART_FAILED = 'UPDATE_CART_FAILED'

const initialState = {
    cartItems: [],
    quantity: 0,
    gettingCartItems: false,
    addingCartItem: false,
    errorMessage: '',
    cartFailedMessage: false,
    updatedCartFailed: false
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
                cartItems: action.payload,
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

        case UPDATE_CART_FAILED:
            return {
                ...state,
                updatedCartFailed: action.payload
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

function updatedCartFailed(message) {
    return {
        type: UPDATE_CART_FAILED,
        payload: message
    }
}


//sideEffects
export function initiateGetCartItems() {
    return function gettingCartItemsSideEffect(dispatch, getState) {
        dispatch(gettingCartItems())
        if (getState().userReducer.isLoggedIn) {
            getCartItemsRequest(getState().userReducer.loggedInUser.id).then(res => {
                if (res.status !== 200)
                    return dispatch(getCartItemsRequestFailed(`Error getting cart items`))
                else {
                    dispatch(setCartItems(res.data))
                    dispatch(setQuantity(res.data.length))
                }
            })
                .catch(err => console.log(`Error in initiateGetCartItems = ${err}`))
        }
    }
}

export function initiateAddCartItem(productToAdd, quantity) {
    return function addCartItemSideEffect(dispatch, getState) {
        const userCartId = getState().userReducer.userCart.id
        console.log(userCartId)
        dispatch(addingCartItem())
        let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
        if (!getState().userReducer.isLoggedIn) {
            if (!cartStorage) {
                cartStorage = [{...productToAdd, quantity:quantity}]
                window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))
            } else {



                for (let product of cartStorage) {
                    console.log(product)
                    if (Number(product.id) !== productToAdd.id) {
                        // console.log(cartStorage, "before push")
                        cartStorage.push({...productToAdd, quantity:quantity})
                        // console.log(cartStorage, "after push")
                        window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))

                    } else {
                        // console.log(cartStorage, "update")
                         product.quantity += quantity
                        window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))

                    }
                }
            }
        } else {
            addCartItemRequest(productToAdd.id, userCartId, quantity).then(res => {
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

export function initiateEditCart(quantity, productId) {

    return function sideEffect(dispatch, getState) {
        const cartId = getState().userReducer.userCart.id
        editCartRequest(productId, cartId, quantity).then(res => {
            if (res.status !== 200) {
                dispatch(updatedCartFailed(`Error editing cart`))
            } else {
                dispatch(initiateGetCartItems())
            }
        })
            .catch(err => console.log(`Error editing cart = ${err}`));
    }
}


export function initiateDeleteCartItem(prodId) {
    console.log("deleting " + prodId)
    return function sideEffect(dispatch, getState) {
        const cartId = getState().userReducer.userCart.id
        dispatch(clearCart())
        fetch(`http://localhost:8080/api/cart/delete/${cartId}/${prodId}`,
            {
                method: 'DELETE',
            }).then(response => {
            if (!response.ok)
                return dispatch(deleteCartFailed())

            response.text().then(text => {
                if (text === 'success')
                    dispatch(initiateGetCartItems())
                else
                    dispatch(deleteCartFailed())
            })
        }).catch(error => console.log(error))
    }
}

