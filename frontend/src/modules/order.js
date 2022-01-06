

const ADDING_ORDER = 'ADDING_ORDER'
const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED'
const GO_TO_RECEIPT = 'GO_TO_RECEIPT'
const CLEAR_RECEIPT = 'CLEAR_RECEIPT'
const GETTING_ORDER_HISTORY = 'GETTING_ORDER_HISTORY'
const GET_ORDER_HISTORY_FAILED = 'GET_ORDER_HISTORY_FAILED'


const initialState = {
    addingOrder: false,
    addOrderFailed: false,
    goToReceipt: false,
    gettingOrderHistory: false,
    getOrderHistoryFailed: false,
    errorMessage: ''


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
                getOrderHistoryFailed: true,
                errorMessage: action.payload
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
    return {type: GET_ORDER_HISTORY_FAILED,
    payload:errorMessage}
}




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
                if(text==="success"){
                    console.log("order placed")
                    dispatch(goToReceipt())
                    // NavigationActions.navigate({ routeName: 'cart' });
                }else{
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
                return dispatch(getOrderHistoryFailed(""))
            response.text().then(text => {
                if(text==="success"){
                    console.log("order placed")
                    dispatch(goToReceipt())
                    // NavigationActions.navigate({ routeName: 'cart' });
                }else{
                    dispatch(addOrderFailed())
                }
            })
        }).catch(error => console.log(error))
    }
}