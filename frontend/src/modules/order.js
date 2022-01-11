const ADDING_ORDER = 'ADDING_ORDER'
const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED'
const GO_TO_RECEIPT = 'GO_TO_RECEIPT'
const CLEAR_RECEIPT = 'CLEAR_RECEIPT'
const GETTING_ORDER_HISTORY = 'GETTING_ORDER_HISTORY'
const GET_ORDER_HISTORY_FAILED = 'GET_ORDER_HISTORY_FAILED'
const GET_ORDER_HISTORY_SUCCESS = 'GET_ORDER_HISTORY_SUCCESS'
const GET_SHOPKEEPER_ORDER_HISTORY_SUCCESS = 'GET_SHOPKEEPER_ORDER_HISTORY_SUCCESS'
const SETTING_COUPON = 'SETTING_COUPON'


const initialState = {
    addingOrder: false,
    addOrderFailed: false,
    goToReceipt: false,
    gettingOrderHistory: false,
    getOrderHistoryFailed: false,
    errorMessage: '',
    getOrderHistorySuccess: false,
    orders: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ADDING_ORDER:
            return {
                ...state,
                addingOrder: true,
            }

        case ADD_ORDER_FAILED:
            return {
                ...state,
                addOrderFailed: true,
            }

        case GO_TO_RECEIPT:
            return {
                ...state,
                goToReceipt: true,
                addOrderFailed: false
            }

        case CLEAR_RECEIPT:
            return {
                ...state,
                goToReceipt: false,
                addOrderFailed: false
            }

        case GETTING_ORDER_HISTORY:
            return {
                ...state,
                gettingOrderHistory: true
            }

        case GET_ORDER_HISTORY_FAILED:
            return {
                ...state,
                gettingOrderHistory: false,
                getOrderHistoryFailed: true,
                errorMessage: action.payload
            }

        case GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                getOrderHistoryFailed: false,
                getOrderHistorySuccess: true,
                orders: action.payload,
                errorMessage: ''
            }

        case GET_SHOPKEEPER_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                gettingOrderHistory: false,
                orders: action.payload,
                errorMessage: ''
            }

        // case SETTING_COUPON:
        //     return {
        //         ...state,
        //         coupon:
        //     }

        default:
            return state
    }
}

export function addingOrder() {
    return {type: ADDING_ORDER}
}

export function addOrderFailed() {
    return {type: ADD_ORDER_FAILED}
}

export function goToReceipt() {
    return {type: GO_TO_RECEIPT}
}

export function clearReceipt() {
    return {type: CLEAR_RECEIPT}
}

function gettingOrderHistory() {
    return {type: GETTING_ORDER_HISTORY}
}

function getOrderHistoryFailed(errorMessage) {
    return {
        type: GET_ORDER_HISTORY_FAILED,
        payload: errorMessage
    }
}

function getOrderHistorySuccess(orders) {
    return {
        type: GET_ORDER_HISTORY_SUCCESS,
        payload: orders
    }
}

function getShopkeeperOrderHistorySuccess(orders) {
    return {
        type: GET_SHOPKEEPER_ORDER_HISTORY_SUCCESS,
        payload: orders
    }
}

export function setCoupon() {
    return {type: SETTING_COUPON}
}

// Side Effects
export function initiateAddOrder() {
    return function addOrderSideEffect(dispatch, getState) {
        const cartId = getState().userReducer.userCart.id
        console.log(cartId)
        dispatch(addingOrder())
        fetch("http://localhost:8080/api/order/add", {
            method: "POST",
            headers: {
                'cartId': cartId,
            },
        }).then(response => {
            if (!response.ok)
                return dispatch(addOrderFailed())
            response.text().then(text => {
                if (text === "success") {
                    console.log("order placed")
                    dispatch(goToReceipt())
                } else {
                    dispatch(addOrderFailed())
                }
            })
        }).catch(error => console.log(error))
    }
}

export function initiateGetOrderHistory() {
    return function getOrderSideEffect(dispatch, getState) {
        const userId = getState().userReducer.loggedInUser.id
        dispatch(gettingOrderHistory())
        fetch("http://localhost:8080/api/order/orderHistory", {
            method: "GET",
            headers: {
                'userId': userId,
            },
        }).then(response => {
            if (!response.ok)
                return dispatch(getOrderHistoryFailed("Unable to get orders."))
            response.json().then(orders => {
                dispatch(getOrderHistorySuccess(orders))
            })
        }).catch(error => console.log(error))
    }
}

export function initiateGetShopkeeperOrderHistory() {
    return function sideEffect(dispatch) {
        dispatch(gettingOrderHistory())
        fetch(`http://localhost:8080/api/order/shopkeeper/orderHistory/all`, {
            method: "GET"
        }).then(response => {
            if (!response.ok)
                return dispatch(getOrderHistoryFailed(`Unable to get orders`))
            response.json().then(orders => {
                dispatch(getShopkeeperOrderHistorySuccess(orders))
            })
        }).catch(error => console.log(error))
    }
}

export function initiateGuestOrder(email, total) {

    let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
    console.log(cartStorage)
    const filteredCartStorage = cartStorage.map(cartItem => {
        return {
            "productId": cartItem.id,
            "quantity": cartItem.quantity,
            "regularPrice": parseFloat(cartItem.regularPrice),
            "salePrice": parseFloat(cartItem.salePrice)
        }
    })
    console.log(filteredCartStorage)
    return function addGuestOrderSideEffect(dispatch, getState) {
        console.log(typeof filteredCartStorage[0].regularPrice)
        dispatch(addingOrder())
        fetch("http://localhost:8080/api/order/addGuestOrder", {
            method: "POST",
            headers: {
                'email': email,
                'total': total,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredCartStorage)
        }).then(response => {
            if (!response.ok)
                return dispatch(addOrderFailed())
            response.text().then(text => {
                if (text === "success") {
                    console.log("order placed")
                    dispatch(goToReceipt())
                    window.localStorage.clear()
                } else {
                    dispatch(addOrderFailed())
                }
            })
        }).catch(error => console.log(error))
    }
}

export function initiateValidateCoupon(coupon) {
    console.log("this is my coupon: ", coupon)
    return function validateCouponSideEffect(dispatch, getState) {
        const userId = getState().userReducer.loggedInUser.id
        fetch("http://localhost:8080/api/coupon/validateCoupon", {
            method: "GET",
            headers: {
                'couponCode': coupon,
                'userId': userId
            },
        }).then(response => {
            if (!response.ok)
                return dispatch(getOrderHistoryFailed("Unable to get coupon."))
            response.json().then(coupon => {
                console.log(coupon)
                if (coupon.message === "success") {
                    return coupon.couponDiscount
                } else {
                    console.log(coupon.message)
                }
            })
        }).catch(error => console.log(error))
    }
}