import {addCartItemRequest, getCartItemsRequest} from "../services/cartService";

const GETTING_CART_ITEMS = 'GETTING_CART_ITEMS'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const GETTING_CART_ITEMS_FAILED = 'GETTING_CART_ITEMS_FAILED'
const ADDING_CART_ITEM = 'ADD_CART_ITEM'
const ADD_CART_ITEM_FAILURE = 'ADD_CART_ITEM_FAILURE'
const ADD_CART_ITEM_SUCCESS = 'ADD_CART_ITEM_SUCCESS'
const TEST_ADD_ITEM = 'TEST_ADD_ITEM'

const cart = [
    {
        productName:"Bose - TV Speaker Bluetooth Soundbar",
        productDescription: "TV Speaker Bluetooth Soundbar",
        brand:"Bose",
        unitPrice:279.99,
        size: null,
        color:"black",
        discontinued:false,
        picture: "soundbar.jpeg",
    },
    {
        brand: "Hisense",
        color: "black",
        dateReceived: "2021-12-25T00:00:00.000+00:00",
        discontinued: false,
        discountAvailable: false,
        id: 1,
        picture: "tv.jpeg",
        productAvailable: "2022-01-10T00:00:00.000+00:00",
        productDescription: "L9 Series",
        productName: "Hisense TriChroma Laser TV with ALR Screen",
        size: "100\"",
        unitPrice: 5499.99,
        unitsInStock: 20,
        unitsReceived: 20,
    }
]

const initialState = {
    cartItems: cart,
    gettingCartItems: false,
    addingCartItem: false,
    errorMessage: ''
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

            //for testing local storage or useNavigate
        // case TEST_ADD_ITEM:
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         cartItems: [...state.cartItems, action.payload]
        //     }

        default:
            return state
    }
}

//Action Creators
// export function testAddItem(testItem) {
//     return {
//         type: TEST_ADD_ITEM,
//         payload: testItem
//     }
// }

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


//sideEffects
export function initiateGetCartItems(userId) {
    return function gettingCartItemsSideEffect(dispatch) {
        dispatch(gettingCartItems())
        getCartItemsRequest(userId).then(res => {
            if (res.status !== 200)
                return dispatch(getCartItemsRequestFailed(`Error getting cart items`))
            else
                dispatch(setCartItems(res.data))
        })
            .catch(err => console.log(`Error in initiateGetCartItems = ${err}`))
    }
}

export function initiateAddCartItem(productToAdd) {
    return function addCartItemSideEffect(dispatch, getState) {
        dispatch(addingCartItem())
        addCartItemRequest(productToAdd).then(res => {
            if (res.data !== 'success') {
                return dispatch(addCartItemFailure(`Error adding item to cart`));
            } else {
                console.log(res.data)
                dispatch(addCartItemSuccess());
                dispatch(initiateGetCartItems(getState().userReducer.loggedInUser.id))
            }
        })
            .catch(err => console.log(`Error in initiateAddCartItem = ${err}`));
    }
}