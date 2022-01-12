import {disableGuestEmailField, setGuestTotal} from "./guest";
import {clearQuantity} from "./cart";

const ADDING_ORDER = 'ADDING_ORDER'
const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED'
const GO_TO_RECEIPT = 'GO_TO_RECEIPT'
const CLEAR_RECEIPT = 'CLEAR_RECEIPT'
const GETTING_ORDER_HISTORY = 'GETTING_ORDER_HISTORY'
const GET_ORDER_HISTORY_FAILED = 'GET_ORDER_HISTORY_FAILED'
const GET_ORDER_HISTORY_SUCCESS = 'GET_ORDER_HISTORY_SUCCESS'
const GET_SHOPKEEPER_ORDER_HISTORY_SUCCESS = 'GET_SHOPKEEPER_ORDER_HISTORY_SUCCESS'
const SET_COUPON = "SET_COUPON"
const VALIDATE_COUPON_START = "VALIDATE_COUPON_START"
const VALIDATE_COUPON_SUCCESS = "VALIDATE_COUPON_SUCCESS"
const VALIDATE_COUPON_FAIL = "VALIDATE_COUPON_FAIL"


const initialState = {
    addingOrder: false,
    addOrderFailed: false,
    goToReceipt: false,
    gettingOrderHistory: false,
    getOrderHistoryFailed: false,
    errorMessage: '',
    getOrderHistorySuccess: false,
    couponDiscount:0,
    couponCode:'',
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
        case SET_COUPON:
            return {
                ...state,
                couponDiscount: action.couponDiscount,
                couponCode: action.couponCode
            }
        case VALIDATE_COUPON_START:
            return {
                ...state,
                errorMessage: "",
            }
        case VALIDATE_COUPON_SUCCESS:
            return {
                ...state,
                errorMessage: "",
            }
        case VALIDATE_COUPON_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
            }
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

export function setCoupon(couponDiscount, couponCode) {
    return {
        type: SET_COUPON,
        couponDiscount,
        couponCode
    }
}

export function validateCouponStart(){
    return {
        type: VALIDATE_COUPON_START
    }
}

export function validateCouponSuccess(){
    return {
        type:VALIDATE_COUPON_SUCCESS
    }
}

export function validateCouponFail(errMessage){
    return {
        type:VALIDATE_COUPON_FAIL,
        payload:errMessage
    }
}

// Side Effects
export function initiateAddOrder(total) {
    return function addOrderSideEffect(dispatch, getState) {
        const cartId = getState().userReducer.userCart.id
        const couponCode = getState().orderReducer.couponCode
        const email = getState().userReducer.loggedInUser.email
        // console.log(cartId)
        dispatch(addingOrder())
        let headers = {
            'cartId': cartId,
            'total':total,
            'email': email
        }
        if(couponCode !== "") {
            headers = {
                'cartId': cartId,
                'total':total,
                'couponCode':couponCode,
                'email': email
            }
        }
        fetch("http://localhost:8080/api/order/add", {
            method: "POST",
            headers: headers,
        }).then(response => {
            if (!response.ok)
                return dispatch(addOrderFailed())
            response.text().then(text => {
                if (text === "success") {
                    // console.log("order placed")
                    dispatch(clearQuantity())
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
    // console.log(cartStorage)
    const filteredCartStorage = cartStorage.map(cartItem => {
        return {
            "productId": cartItem.id,
            "quantity": cartItem.quantity,
            "regularPrice": parseFloat(cartItem.regularPrice),
            "salePrice": parseFloat(cartItem.salePrice)
        }
    })
    // console.log(filteredCartStorage)
    return function addGuestOrderSideEffect(dispatch, getState) {
        // console.log(typeof filteredCartStorage[0].regularPrice)
        let couponCode = getState().orderReducer.couponCode
        dispatch(addingOrder())
        let headers = {
            'email': email,
            'total': total,
            'Content-Type': 'application/json'
        }
        if(couponCode !== "") {
            headers = {
                'email': email,
                'total': total,
                'Content-Type': 'application/json',
                'couponCode':couponCode
            }
        }
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
                    // console.log("order placed")
                    dispatch(setCoupon(0, ""))
                    dispatch(goToReceipt())
                    dispatch(disableGuestEmailField(false))
                    dispatch(clearQuantity())
                    dispatch(setGuestTotal(0))
                    window.localStorage.clear()
                } else {
                    dispatch(addOrderFailed())
                }
            })
        }).catch(error => console.log(error))
    }
}

export function initiateValidateCoupon(coupon) {
    // console.log("this is my coupon: ", coupon)
    return function (dispatch, getState) {
        dispatch(validateCouponStart())
        // either guest or user will be calling the endpoint not both
        const userId = getState().userReducer.loggedInUser.id
        let email = getState().guestReducer.guestEmail
        let headers;
        if (userId) headers = {
            'couponCode': coupon,
            'userId': userId
        }
        else if (!userId && email) headers = {
            'couponCode': coupon,
            'email': email
        }
        else headers = {
                'couponCode': coupon
            }
        fetch("http://localhost:8080/api/coupon/validateCoupon", {
            method: "GET",
            headers: headers,
        }).then(response => {
            if (!response.ok)
                return dispatch(validateCouponFail("Unable to get coupon."))
            response.json().then(couponRes => {
                // console.log(couponRes)
                if (couponRes.message === "success") {
                    if(!userId) {
                        dispatch(disableGuestEmailField(true))
                    }
                    dispatch(validateCouponSuccess())
                    dispatch(setCoupon(couponRes.couponDiscount, coupon))
                } else {
                    dispatch(disableGuestEmailField(false))
                    dispatch(validateCouponFail(couponRes.message))
                    // console.log(couponRes.message)
                }
            })
        }).catch(error => console.log(error))
    }
}