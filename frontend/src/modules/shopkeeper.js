const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const EDIT_PRODUCT_FAILED = 'EDIT_PRODUCT_FAILED'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'
const PRODUCTS_UPDATED = 'PRODUCTS_UPDATED'


const initialState = {
    products: [],
    productToEdit: undefined,
    showEditProduct: false,
    gettingProducts: false,
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
                productToEdit: action.product
            }

        case EDIT_PRODUCT_FAILED:
            return {
              ...state,
              showEditProduct: false
            }

        case DELETE_PRODUCT:
            return {
                ...state
            }

        case GET_PRODUCTS:
            return {

            }

        case GET_PRODUCTS_FAILED:
            return {

            }

        case PRODUCTS_UPDATED:
            return {
                ...state,
                products: action.products
            }
    }
}