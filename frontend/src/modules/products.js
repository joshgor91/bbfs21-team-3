import {getProductsRequest} from "../services/productsService";

const GETTING_PRODUCTS = 'GETTING_PRODUCTS'
const SET_PRODUCTS = 'SET_PRODUCTS'
const GETTING_PRODUCTS_FAILED = 'GETTING_PRODUCTS_FAILED'

const initialState = {
    products: [],
    gettingProducts: false,
}

//Action Creators
function gettingProducts() {
    return {
        type: GETTING_PRODUCTS
    }
}

function setProducts(products) {
    console.log(products)
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

function getProductsRequestFailed() {
    return {
        type: GETTING_PRODUCTS_FAILED
    }
}

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETTING_PRODUCTS:
            return {
                gettingProducts: true
            }
        case SET_PRODUCTS:
            return {
                products: action.payload,
                gettingProducts: false
            }
        default:
            return state
    }
}

//sideEffects
export function initiateGetAllProducts() {
    return function gettingProductsSideEffect(dispatch) {
        dispatch(gettingProducts())
        getProductsRequest().then(response => {
            console.log(response)
            console.log(response.data)
            if (response.status !== 200)
                return dispatch(getProductsRequestFailed())
            else
                dispatch(setProducts(response.data))
        })
            .catch(error => console.log('Error in initiateGetAllProducts', error))
    }
}