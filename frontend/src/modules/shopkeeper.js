import {logout} from "./user";
import {getCategoriesRequest, createCategoryRequest, editCategoryRequest} from "../services/categoryService";

const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const START_EDIT_PRODUCT = 'START_EDIT_PRODUCT'
const EDIT_PRODUCT_FAILED = 'EDIT_PRODUCT_FAILED'
const CANCEL_EDIT_PRODUCT = 'CANCEL_EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'
const PRODUCTS_UPDATED = 'PRODUCTS_UPDATED'
const VIEW_PRODUCT_DETAILS = 'VIEW_PRODUCT_DETAILS'
const CANCEL_VIEW_PRODUCT_DETAILS = 'CANCEL_VIEW_PRODUCT_DETAILS'
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE'
const SET_CATEGORIES = 'SET_CATEGORIES'
const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE'
const EDIT_CATEGORY_FAILURE = 'EDIT_CATEGORY_FAILURE'
// const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
const UPDATE_PRODUCT_NAME = 'UPDATE_PRODUCT_NAME'
const UPDATE_PRODUCT_DESCRIPTION = 'UPDATE_PRODUCT_DESCRIPTION'
const UPDATE_BRAND = 'UPDATE_BRAND'
const UPDATE_UNIT_PRICE = 'UPDATE_UNIT_PRICE'
const UPDATE_UNITS_IN_STOCK = 'UPDATE_UNITS_IN_STOCK'
const UPDATE_SIZE = 'UPDATE_SIZE'
const UPDATE_COLOR = 'UPDATE_COLOR'
const UPDATE_PRODUCT_AVAILABLE = 'UPDATE_PRODUCT_AVAILABLE'
const UPDATE_DISCONTINUED = 'UPDATE_DISCONTINUED'
const UPDATE_DISCOUNT_AVAILABLE = 'UPDATE_DISCOUNT_AVAILABLE'
const UPDATE_PICTURE = 'UPDATE_PICTURE'
const UPDATE_DATE_RECEIVED = 'UPDATE_DATE_RECEIVED'
const UPDATE_UNITS_RECEIVED = 'UPDATE_UNITS_RECEIVED'

const SCHEDULED_SALES_PRICE = 'SCHEDULED_SALES_PRICE'
const SCHEDULED_SALES_EFFECTIVE_DATE = 'SCHEDULED_SALES_EFFECTIVE_DATE'


const initialState = {
    products: [],
    productToEdit: undefined,
    showEditProduct: false,
    getProducts: false,
    addProduct: false,
    addErrorOccurred: false,
    editErrorOccurred: false,
    categories: [],
    gettingAllCategories: false,
    errorMessage: '',
    productName: '',
    productDescription: '',
    brand: '',
    unitPrice: '', // or should we still use '' ? unitPrice is listed as type Float in Product controller in Backend
    unitsInStock: '',
    size: '',
    color: '',
    productAvailable: '', // similar question for type date, also tried combining both for date
    discontinued: undefined, // similar question for type boolean
    discountAvailable: '',
    picture: '',
    dateReceived: '',
    unitsReceived: '',
    hideTable: true,
    productToView: undefined,
    showProductDetails: false,
    price:'',
    effectiveDate:'',
    saleStartDate:'',
    saleEndDate:'',
    discount: '',
    saleDescription:''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SCHEDULED_SALES_PRICE:
            return {
                ...state,
                price: action.price
            }

        case SCHEDULED_SALES_EFFECTIVE_DATE:
            return {
                ...state,
                effectiveDate: action.effectiveDate
            }

            // case SCHEDULED_

        case ADD_PRODUCT:
            return {
                ...state,
                showEditProduct: false,
                addProduct: true,
            }

        case ADD_PRODUCT_FAILED:
            return {
                ...state,
                addErrorOccurred: true
            }

        case EDIT_PRODUCT:
            return {
                ...state,
                showEditProduct: true,
                productToEdit: action.product,
                // categories: action.product.categories,
                productName: action.product.productName,
                productDescription: action.product.productDescription,
                brand: action.product.brand,
                unitPrice: action.product.unitPrice,
                unitsInStock: action.product.unitsInStock,
                size: action.product.size,
                color: action.product.color,
                productAvailable: action.product.productAvailable,
                discontinued: action.product.discontinued,
                discountAvailable: action.product.discountAvailable,
                picture: action.product.picture,
                dateReceived: action.product.dateReceived,
                unitsReceived: action.product.unitsReceived
            }

        case CANCEL_EDIT_PRODUCT:
            return {
                ...state,
                showEditProduct: false
            }

        case EDIT_PRODUCT_FAILED:
            return {
                ...state,
                editErrorOccurred: true
            }

        case VIEW_PRODUCT_DETAILS:
            return {
                ...state,
                showProductDetails: true,
                productToView: action.product
            }

        case CANCEL_VIEW_PRODUCT_DETAILS:
            return {
                ...state,
                showProductDetails: false
            }

        case GET_CATEGORIES:
            return {
                ...state,
                gettingAllCategories: true
            }

        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                gettingAllCategories: false,
                errorMessage: action.payload
            }

        case SET_CATEGORIES:
            return {
                ...state,
                gettingAllCategories: false,
                categories: action.payload,
                errorMessage: ''
            }

        case CREATE_CATEGORY_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }

        case EDIT_CATEGORY_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }

        // case UPDATE_CATEGORIES:
        //     return {
        //         ...state,
        //         categories: [...state.categories, action.categories]
        //     }

        case UPDATE_PRODUCT_NAME:
            return {
                ...state,
                productName: action.productName
            }

        case UPDATE_PRODUCT_DESCRIPTION:
            return {
                ...state,
                productDescription: action.productDescription
            }

        case UPDATE_BRAND:
            return {
                ...state,
                brand: action.brand
            }

        case UPDATE_UNIT_PRICE:
            return {
                ...state,
                unitPrice: action.unitPrice
            }

        case UPDATE_UNITS_IN_STOCK:
            return {
                ...state,
                unitsInStock: action.unitsInStock
            }

        case UPDATE_SIZE:
            return {
                ...state,
                size: action.size
            }

        case UPDATE_COLOR:
            return {
                ...state,
                color: action.color
            }

        case UPDATE_PRODUCT_AVAILABLE:
            return {
                ...state,
                productAvailable: action.productAvailable
            }

        case UPDATE_DISCONTINUED:
            return {
                ...state,
                discontinued: action.discontinued
            }

        case UPDATE_DISCOUNT_AVAILABLE:
            return {
                ...state,
                discountAvailable: action.discountAvailable
            }

        case UPDATE_PICTURE:
            return {
                ...state,
                picture: action.picture
            }

        case UPDATE_DATE_RECEIVED:
            return {
                ...state,
                dateReceived: action.dateReceived
            }

        case UPDATE_UNITS_RECEIVED:
            return {
                ...state,
                unitsReceived: action.unitsReceived
            }

        case GET_PRODUCTS:
            return {
                ...state,
                getProducts: true,
                showEditProduct: false,
                hideTable: false
            }

        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                getProducts: false,
                showEditProduct: false,
                hideTable: false
            }

        case PRODUCTS_UPDATED:
            return {
                ...state,
                products: action.products,
                addProduct: false,
                showEditProduct: false
            }

        default:
            return state
    }
}

// export function scheduledSalesPrice(price){
//     // console.log("scheduledSales' price is "+ price)
//     return{
//         type: SCHEDULED_SALES_PRICE,
//         price
//
//     }
// }

// export function scheduledSalesEffectiveDate(effectiveDate){
//     // console.log('effectiveDate is ' + effectiveDate)
//     return{
//         type: SCHEDULED_SALES_EFFECTIVE_DATE,
//         effectiveDate
//     }
// }

export function addProduct() {
    return {
        type: ADD_PRODUCT
    }
}

function addProductFailed() {
    return {
        type: ADD_PRODUCT_FAILED
    }
}

export function editProduct(product) {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

function startEditProduct() {
    return {
        type: START_EDIT_PRODUCT
    }
}

function editProductFailed() {
    return {
        type: EDIT_PRODUCT_FAILED
    }
}

export function cancelEditProduct() {
    return {
        type: CANCEL_EDIT_PRODUCT
    }
}

export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT,
        id
    }
}

export function deleteProductFailed() {
    return {
        type: DELETE_PRODUCT_FAILED
    }
}

export function viewProductDetails(product) {
    // console.log(product)
    return {
        type: VIEW_PRODUCT_DETAILS,
        product
    }
}

export function cancelViewProductDetails() {
    return {
        type: CANCEL_VIEW_PRODUCT_DETAILS
    }
}

// export function updateCategories(categories) {
//     return {
//         type: UPDATE_CATEGORIES,
//         categories
//     }
// }

export function updateProductName(productName) {
    // console.log(productName)
    return {
        type: UPDATE_PRODUCT_NAME,
        productName
    }
}

export function updateProductDescription(productDescription) {
    return {
        type: UPDATE_PRODUCT_DESCRIPTION,
        productDescription
    }
}

export function updateBrand(brand) {
    return {
        type: UPDATE_BRAND,
        brand
    }
}

export function updateUnitPrice(unitPrice) {
    return {
        type: UPDATE_UNIT_PRICE,
        unitPrice
    }
}

export function updateUnitsInStock(unitsInStock) {
    return {
        type: UPDATE_UNITS_IN_STOCK,
        unitsInStock
    }
}

export function updateSize(size) {
    return {
        type: UPDATE_SIZE,
        size
    }
}

export function updateColor(color) {
    return {
        type: UPDATE_COLOR,
        color
    }
}

export function updateProductAvailable(productAvailable) {
    return {
        type: UPDATE_PRODUCT_AVAILABLE,
        productAvailable
    }
}

export function updateDiscontinued(discontinued) {
    console.log(discontinued)
    return {
        type: UPDATE_DISCONTINUED,
        discontinued
    }
}

export function updateDiscountAvailable(discountAvailable) {
    console.log(discountAvailable)
    return {
        type: UPDATE_DISCOUNT_AVAILABLE,
        discountAvailable
    }
}

export function updatePicture(picture) {
    return {
        type: UPDATE_PICTURE,
        picture
    }
}

export function updateDateReceived(dateReceived) {
    return {
        type: UPDATE_DATE_RECEIVED,
        dateReceived
    }
}

export function updateUnitsReceived(unitsReceived) {
    return {
        type: UPDATE_UNITS_RECEIVED,
        unitsReceived
    }
}

export function getProducts() {
    return {
        type: GET_PRODUCTS
    }
}

function getCategories() {
    return {
        type: GET_CATEGORIES
    }
}

function getCategoriesFailure(message) {
    return {
        type: GET_CATEGORIES_FAILURE,
        payload: message
    }
}

function editCategoryFailure(message) {
    return {
        type: EDIT_CATEGORY_FAILURE,
        payload: message
    }
}

function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}

function createCategoryFailure(message) {
    return {
        type: CREATE_CATEGORY_FAILURE,
        payload: message
    }
}

export function getProductsFailed() {
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
    return function sideEffect(dispatch) {
        dispatch(addProduct())

        fetch(`http://localhost:8080/api/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if (!response.ok)
                return dispatch(addProductFailed())

            response.text().then(text => {
                if (text === 'success') {
                    dispatch(initiateGetProducts())
                    alert('New Product Added Successfully')
                } else
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

export function initiateGetCategories() {
    return function sideEffect(dispatch) {
        dispatch(getCategories())
        getCategoriesRequest().then(res => {
            if (res.status !== 200) {
                dispatch(getCategoriesFailure(`Error getting categories`))
            } else {
                dispatch(setCategories(res.data))
            }
        })
    }
}

export function initiateCreateCategory(newCategory) {
    console.log(newCategory)
    return function sideEffect(dispatch) {
        createCategoryRequest(newCategory).then(res => {
            console.log(res)
            if (res.status !== 200) {
                dispatch(createCategoryFailure(`Error creating category`))
            } else {
                dispatch(initiateGetCategories())
            }
        })
    }
}

export function initiateEditCategory(updatedCategory) {
    return function sideEffect(dispatch) {
        editCategoryRequest(updatedCategory).then(res => {
            if (res.status !== 200) {
                dispatch(editCategoryFailure(`Error editing category`))
            } else {
                dispatch(initiateGetCategories())
                dispatch(initiateGetProducts())
            }
        })
    }
}

export function initiateEditProduct(product) {
    return function sideEffect(dispatch) {
        dispatch(startEditProduct())

        fetch('http://localhost:8080/api/products/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if (!response.ok)
                return dispatch(editProductFailed())

            response.text().then(text => {
                if (text === 'success')
                    dispatch(initiateGetProducts())
                else
                    dispatch(editProductFailed())
            })
        }).catch(error => console.log(error))
    }
}

export function initiateDeleteProduct(id) {
    return function sideEffect(dispatch, getState) {
        dispatch(deleteProduct())

        fetch(`http://localhost:8080/api/products/delete/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok)
                dispatch(deleteProductFailed())
            response.text().then(text => {
                if (text === 'success')
                    dispatch(initiateGetProducts())
                else
                    dispatch(deleteProductFailed())
            })
        }).catch(error => console.log(error))
    }
}

