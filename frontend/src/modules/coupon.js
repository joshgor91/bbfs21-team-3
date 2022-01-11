const GET_ALL_COUPON_START = "GET_ALL_COUPON_START"
const GET_ALL_COUPON_SUCCESS = "GET_ALL_COUPON_SUCCESS"
const GET_ALL_COUPON_FAIL = "GET_ALL_COUPON_FAIL"
const ADD_COUPON_START = "ADD_COUPON_START"
const ADD_COUPON_SUCCESS = "ADD_COUPON_SUCCESS"
const ADD_COUPON_FAIL = "ADD_COUPON_FAIL"
const EDIT_COUPON_START = "EDIT_COUPON_START"
const EDIT_COUPON_SUCCESS = "EDIT_COUPON_SUCCESS"
const EDIT_COUPON_FAIL = "EDIT_COUPON_FAIL"
const DELETE_COUPON_START = "DELETE_COUPON_START"
const DELETE_COUPON_FAIL = "DELETE_COUPON_FAIL"


const initialState = {
    coupons:[],
    errorMessage:""
}

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COUPON_START:
            return {
                ...state,
                errorMessage: ""
            }
        case GET_ALL_COUPON_SUCCESS:
            return {
                ...state,
                coupons: action.payload
            }
        case GET_ALL_COUPON_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        case ADD_COUPON_START:
            return {
                ...state,
                errorMessage: "",
            }
        case ADD_COUPON_SUCCESS:
            return {
                ...state,
                errorMessage: "",
            }
        case ADD_COUPON_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
            }
        case EDIT_COUPON_START:
            return {
                ...state,
                errorMessage: "",
            }
        case EDIT_COUPON_SUCCESS:
            return {
                ...state,
                errorMessage: "",
            }
        case EDIT_COUPON_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
            }
        case DELETE_COUPON_START:
            return {
                ...state,
                errorMessage: "",
            }
        case DELETE_COUPON_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

// actions

export function getAllCouponStart() {
    return {
        type:GET_ALL_COUPON_START
    }
}
export function getAllCouponSuccess(coupons) {
    return {
        type:GET_ALL_COUPON_SUCCESS,
        payload:coupons
    }
}
export function getAllCouponFail(errorMessage) {
    return {
        type:GET_ALL_COUPON_FAIL,
        payload:errorMessage
    }
}
export function addCouponStart(){
    return {
        type:ADD_COUPON_START
    }
}
export function addCouponSuccess(){
    return {
        type:ADD_COUPON_SUCCESS
    }
}
export function addCouponFail(errMessage){
    return {
        type:ADD_COUPON_FAIL,
        payload:errMessage
    }
}
export function editCouponStart(){
    return {
        type:EDIT_COUPON_START
    }
}
export function editCouponSuccess(){
    return {
        type:EDIT_COUPON_SUCCESS
    }
}
export function editCouponFail(errMessage){
    return {
        type:EDIT_COUPON_FAIL,
        payload:errMessage
    }
}
export function deleteCouponFail(errMessage) {
    return{
        type:DELETE_COUPON_FAIL,
        paylaod:errMessage
    }
}

/// side effects

export function initiateGetAllCoupons() {
    return function (dispatch) {
        dispatch(getAllCouponStart())
        fetch("http://localhost:8080/api/coupon/all")
            .then(res => {
                if(!res.ok) getAllCouponFail("couldn't find coupons")
                else return res.json()
            })
            .then(coupons => {
                dispatch(getAllCouponSuccess(coupons))
        }).catch(err => {
            getAllCouponFail(err.message)
            console.log(err)
        })
    }
}

export function initiateAddCoupon(coupon) {
    return function (dispatch) {
        dispatch(addCouponStart())
        fetch("http://localhost:8080/api/coupon/add", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(coupon)
        }).then(res => {
            if(!res.ok) dispatch(addCouponFail("could not get a proper response"))
            else return res.text()
        }).then(text => {
            if(text === "success") {
                dispatch(addCouponSuccess())
                dispatch(initiateGetAllCoupons())
            } else {
                dispatch(addCouponFail(text))
            }
        }).catch(err => {
            dispatch(addCouponFail(err.message))
            console.log(err.message)
        })
    }
}

export function initiateEditCoupon(coupon) {
    console.log("THIS IS THE COUPON", coupon)
    let couponObject = {...coupon}
    if(coupon.startDate === "Invalid date" || coupon.endDate === "Invalid date") {
        couponObject = {...coupon, startDate:"", endDate:""}
    }
    return function (dispatch) {
        dispatch(editCouponStart())
        fetch("http://localhost:8080/api/coupon/edit", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(couponObject)
        }).then(res => {
            if(!res.ok) dispatch(editCouponFail("could not get a proper response"))
            else return res.text()
        }).then(text => {
            if(text === "success") {
                dispatch(editCouponSuccess())
                dispatch(initiateGetAllCoupons())
            } else {
                dispatch(editCouponFail(text))
            }
        }).catch(err => {
            dispatch(editCouponFail(err.message))
            console.log(err.message)
        })
    }
}

export function initiateDeleteCoupon(coupon) {
    return function(dispatch) {
        fetch("http://localhost:8080/api/coupon/delete", {
            method:"DELETE",
            headers:{
                "couponCode":coupon.couponCode
            }
        }).then(res => {
            if(!res.ok) dispatch(deleteCouponFail("could not get a response"))
            else return res.text()
        }).then(text => {
            if(text === "success") {
                dispatch(initiateGetAllCoupons())
            } else {
                dispatch(deleteCouponFail("could not delete coupon"))
            }
        }).catch(err => {
            console.log(err.message)
            dispatch(deleteCouponFail(err.message))
        })
    }
}