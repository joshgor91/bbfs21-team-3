import {addCartItemRequest, editCartRequest, getCartItemsRequest} from "../services/cartService";
import {editCategoryRequest} from "../services/categoryService";
import {initiateGetCategories, initiateGetProducts} from "./shopkeeper";
import {calculateGuestTotal} from "../utils/localStorageUtils";

const GETTING_CART_ITEMS = 'GETTING_CART_ITEMS'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const GETTING_CART_ITEMS_FAILED = 'GETTING_CART_ITEMS_FAILED'
const ADDING_CART_ITEM = 'ADD_CART_ITEM'
const ADD_CART_ITEM_FAILURE = 'ADD_CART_ITEM_FAILURE'
const ADD_CART_ITEM_SUCCESS = 'ADD_CART_ITEM_SUCCESS'
const SET_QUANTITY = 'SET_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
const CLEAR_QUANTITY = 'CLEAR_QUANTITY'
const SET_TOTAL_COST = 'SET_TOTAL_COST'
const CLEAR_TOTAL_COST = 'CLEAR_TOTAL_COST'
const DELETE_CART_FAILED = 'DELETE_CART_FAILED'
const UPDATE_CART_FAILED = 'UPDATE_CART_FAILED'

const initialState = {
    cartItems: [],
    quantity: 0,
    total:0,
    gettingCartItems: false,
    addingCartItem: false,
    errorMessage: '',
    cartFailedMessage: false,
    updatedCartFailed: false,
    addCartItemSuccess: false
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
                errorMessage: '',
                addCartItemSuccess: true
            }

        case GETTING_CART_ITEMS_FAILED:
            return {
                ...state,
                gettingCartItems: false,
                errorMessage: action.payload
            }

        case SET_QUANTITY:
            // console.log(action.payload)
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
        case SET_TOTAL_COST:
            return {
                ...state,
                total:action.payload
            }
        case CLEAR_TOTAL_COST:
            return{
                ...state,
                total:0
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

export function clearQuantity() {
    return {
        type: CLEAR_QUANTITY
    }
}

export function setTotalCost(total){
    return {
        type:SET_TOTAL_COST,
        payload:total
    }
}

export function clearTotalCost(){
    return {
        type:CLEAR_TOTAL_COST
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
        let newCartItemQuantity = 0;
        dispatch(gettingCartItems())
        if (getState().userReducer.isLoggedIn) {
            getCartItemsRequest(getState().userReducer.loggedInUser.id).then(res => {
                if (res.status !== 200)
                    return dispatch(getCartItemsRequestFailed(`Error getting cart items`))
                else {
                    dispatch(setCartItems(res.data))
                    for (let product of res.data){
                        newCartItemQuantity+=product.quantity
                    }
                    dispatch(setQuantity(newCartItemQuantity))
                }
            })
                .catch(err => console.log(`Error in initiateGetCartItems = ${err}`))
        } else {
            let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
            if(!cartStorage) dispatch(setQuantity(0))
            else if(Array.isArray(cartStorage) && cartStorage.length > 0) {
                cartStorage.forEach(cartItem => {
                    newCartItemQuantity += cartItem.quantity
                })
                dispatch(setQuantity(newCartItemQuantity))
            } else {
                dispatch(setQuantity(0))
            }
        }
    }
}

export function initiateAddCartItem(productToAdd, quantity, regularPrice, salePrice) {
    return function addCartItemSideEffect(dispatch, getState) {
        const userCartId = getState().userReducer.userCart.id
        let newCartItemQuantity = 0;
        dispatch(addingCartItem())
        let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
        if (!getState().userReducer.isLoggedIn) {
            if (!cartStorage) {
                cartStorage = [{...productToAdd, quantity:quantity, regularPrice:regularPrice, salePrice:salePrice}]
                window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))
            } else {
                const productExists = cartStorage.some(product => {
                    return Number(product.id) === productToAdd.id
                })
                if(!productExists) {
                    cartStorage.push({...productToAdd, quantity:quantity, regularPrice:regularPrice, salePrice:salePrice})
                    window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))
                } else {
                    for (let product of cartStorage) {
                        if (Number(product.id) === productToAdd.id) {
                            product.quantity += quantity
                        }
                    }
                    window.localStorage.setItem('cartItems', JSON.stringify(cartStorage))
                }
            }
                for (let product of cartStorage){
                    newCartItemQuantity+=product.quantity
                }
                let cartTotal = calculateGuestTotal()
                window.localStorage.setItem('cartTotal', cartTotal)
                dispatch(setQuantity(newCartItemQuantity))
        } else {
            addCartItemRequest(productToAdd.id, userCartId, quantity, regularPrice, salePrice).then(res => {
                if (res.data !== 'success') {
                    return dispatch(addCartItemFailure(`Error adding item to cart`));
                } else {
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
        let newCartItemQuantity = 0;
        let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
        if (!getState().userReducer.isLoggedIn) {
            const updatedCart = cartStorage.map(item => {
                if (item.id === productId) {
                    item.quantity = quantity
                }
                return item
            })
            localStorage.setItem("cartItems", JSON.stringify(updatedCart))
            for (let product of updatedCart) {
                newCartItemQuantity += product.quantity
            }
            dispatch(setQuantity(newCartItemQuantity))
        } else {
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
}


export function initiateDeleteCartItem(prodId) {
    // console.log("deleting " + prodId)
    return function sideEffect(dispatch, getState) {
        const cartId = getState().userReducer.userCart.id
        dispatch(clearCart())
        fetch(`http://localhost:8080/api/cart/delete/${cartId}/${prodId}`,
       {
            method: 'DELETE',
        }).then(response => {
            if(!response.ok)
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

