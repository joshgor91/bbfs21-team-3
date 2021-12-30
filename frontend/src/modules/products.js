import {getProductRequest, getProductsRequest} from "../services/productsService";

const GETTING_PRODUCTS = 'GETTING_PRODUCTS'
const SET_PRODUCTS = 'SET_PRODUCTS'
const GETTING_PRODUCTS_FAILED = 'GETTING_PRODUCTS_FAILED'
const SET_PRODUCT_TO_VIEW = 'SET_PRODUCT_TO_VIEW'
const GETTING_PRODUCT_TO_VIEW_FAILED = 'GETTING_PRODUCT_TO_VIEW_FAILED'

const initialState = {
    products: [],
    productToView: {},
    gettingProducts: false,
    gettingProductToViewFailed: false,
}

//Action Creators
function gettingProducts() {
    return {
        type: GETTING_PRODUCTS
    }
}

function setProducts(products) {
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

function setProduct(product) {
    return {
        type: SET_PRODUCT_TO_VIEW,
        payload: product
    }
}

function gettingProductFailed() {
    return {
        type: GETTING_PRODUCT_TO_VIEW_FAILED
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
        case SET_PRODUCT_TO_VIEW:
            return {
                productToView: action.payload,
                gettingProductToViewFailed: false
            }
        case GETTING_PRODUCT_TO_VIEW_FAILED:
            return {
                gettingProductToViewFailed: true
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
            if (response.status !== 200)
                return dispatch(getProductsRequestFailed())
            else
                dispatch(setProducts(response.data))
        })
            .catch(error => console.log('Error in initiateGetAllProducts', error))
    }
}

export function initiateGetProductById(productId) {
    return function gettingProductSideEffect(dispatch) {
        getProductRequest(productId).then(response => {
            if (response.status !== 200)
                return dispatch(gettingProductFailed())
            else
                console.log(response)
        })
            .catch(error => console.log('Error in initiate get product by id', error))
    }
}