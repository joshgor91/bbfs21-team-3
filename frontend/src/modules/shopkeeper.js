import {logout} from "./user";

const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const CANCEL_EDIT_PRODUCT = 'CANCEL_EDIT_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'
const PRODUCTS_UPDATED = 'PRODUCTS_UPDATED'



const initialState = {
    products: [],
    productToEdit: undefined,
    showEditProduct: false,
    getProducts: false,
    addProduct: false,
    registerErrorOccurred: false,
    productName: '',
    productDescription: '',
    brand: '',
    unitPrice: 0.00, // or should we still use '' ? unitPrice is listed as type Float in Product controller in Backend
    unitsInStock: 0,
    size: '',
    color: '',
    productAvailable: new Date(''), // similar question for type date, also tried combining both for date
    discontinued: false, // similar question for type boolean
    picture: '',
    dateReceived: new Date(''),
    unitsReceived: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                showEditProduct: false,
                addProduct: true,
            }

        case CREATE_PRODUCT:
            return {
                ...state,
                showEditProduct: true,
                productName: '',
                productDescription: '',
                brand: '',
                unitPrice: 0.00,
                unitsInStock: 0,
                size: '',
                color: '',
                productAvailable: new Date(''),
                discontinued: false,
                picture: '',
                dateReceived: new Date(''),
                unitsReceived: 0
            }

        case ADD_PRODUCT_FAILED:
            return {
                ...state,
                registerErrorOccurred: true
            }

        case EDIT_PRODUCT:
            return {
                ...state,
                showEditProduct: true,
                productToEdit: action.product,
                productName: action.product.productName,
                productDescription: action.product.productDescription,
                brand: action.product.brand,
                unitPrice: action.product.unitPrice,
                unitsInStock: action.product.unitsInStock,
                size: action.product.size,
                color: action.product.color,
                productAvailable: action.product.productAvailable,
                discontinued: action.product.discontinued,
                picture: action.product.picture,
                dateReceived: action.product.dateReceived,
                unitsReceived: action.product.unitsReceived
            }

        case CANCEL_EDIT_PRODUCT:
            return {
                ...state,
                showEditProduct: false
            }

        case GET_PRODUCTS:
            return {
                ...state,
                getProducts: true,
            }

        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                getProducts: false
            }

        case PRODUCTS_UPDATED:
            return {
                ...state,
                products: action.products
            }

        default:
            return state
    }
}


export function createProduct(){
    return {
        type: CREATE_PRODUCT
    }
}

export function addProduct(){
    return {
        type: ADD_PRODUCT
    }
}

function addProductFailed() {
    return {
        type: ADD_PRODUCT_FAILED
    }
}

function editProduct(product) {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

export function cancelEditProduct() {
    return {
        type: CANCEL_EDIT_PRODUCT
    }
}

export function getProducts() {
    return {
        type: GET_PRODUCTS
    }
}

function getProductsFailed() {
    return {
        type: GET_PRODUCTS_FAILED
    }
}

function productsUpdated(products) {
    return {
        type: PRODUCTS_UPDATED,
        products
    }
}

export function initiateAddProduct(product) {
    return function sideEffect(dispatch, getState) {
        dispatch(addProduct())

        fetch('http://localhost:8080/api/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if (!response.ok)
                return dispatch(addProductFailed())

            response.text().then(text => {
                if (text === 'success')
                    dispatch(initiateGetProducts())
                else
                    dispatch(addProductFailed())
            })
        }).catch(error => console.log(error))
    }
}

export function initiateGetProducts() {
    return function sideEffect(dispatch, useState) {
        dispatch(getProducts())

        fetch('http://localhost:8080/api/products/all', {
            method: 'GET'
        }).then(response => {
            if (!response.ok)
                return dispatch(getProductsFailed())
            response.json().then(products => {
                dispatch(productsUpdated(products))
            })
        }).catch(error => console.log(error))
    }
}

