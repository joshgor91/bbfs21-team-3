import {initiateGetProducts} from "./shopkeeper";

const REQUEST_LOGIN = 'REQUEST_LOGIN'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const REGISTERING_USER = 'REGISTERING_USER'
const ADD_USER_FAILED = 'ADD_USER_FAILED'
const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN'
const SET_USER_INFO = 'SET_USER_INFO'
const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
const UPDATE_ADDRESS1 = 'UPDATE_ADDRESS1'
const UPDATE_ADDRESS2 = 'UPDATE_ADDRESS2'
const UPDATE_CITY = 'UPDATE_CITY'
const UPDATE_STATE = 'UPDATE_STATE'
const UPDATE_ZIPCODE = 'UPDATE_ZIPCODE'

const initialState = {
    isLoggedIn: false,
    loginPending: false,
    loginErrorOccurred: false,
    users: [],
    loggedInUser: {},
    userForm:{},
    registerErrorOccurred: false,
    showInfo: false,
    userInfo: {},
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
}


export default function reducer(state = initialState, action){
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                loginErrorOccurred: false,
                loginPending: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginErrorOccurred: false,
                loginPending: false,
            }

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                loginErrorOccurred: false,
                loginPending: false
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginErrorOccurred: true,
                loginPending: false
            }

        case SET_USER_LOGGED_IN:
            return {
                ...state,
                loggedInUser: action.user
            }

        case REGISTERING_USER:
            return {
                ...state,
                showEditUser: false,
                addingUser: true
            }

        case SET_USER_INFO:
            console.log(action.payload)
            return {
                ...state,
                showInfo: true,
                userInfo: action.payload,
                address1: action.payload.address1,
                address2: action.payload.address2,
                city: action.payload.city,
                state: action.payload.state,
                zipcode: action.payload.zipcode,
            }

        case CLEAR_USER_INFO:
            return {
                ...state,
                showInfo: false,
                userInfo: {},
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipcode: '',
            }

        default:
            return state
    }
}

export function updateAddress1() {
    return {type: UPDATE_ADDRESS1}
}

export function updateAddress2() {
    return {type: UPDATE_ADDRESS2}

}

export function updateCity() {
    return {type: UPDATE_CITY}

}

export function updateState() {
    return {type: UPDATE_STATE}

}

export function updateZipcode() {
    return {type: UPDATE_ZIPCODE}

}

export function requestLogin() {
    return {
        type: REQUEST_LOGIN,
    }
}

export function loginFailure(errorMessage) {
    return {type: LOGIN_FAILURE,
        payload: errorMessage}
}

export function loginSuccess() {
    return {type: LOGIN_SUCCESS,
    }
}

export function logout() {
    return {type: LOGOUT}
}


function registeringUser() {
    return {
        type: REGISTERING_USER
    }
}

function addUserFailed() {
    return {
        type: ADD_USER_FAILED
    }
}

function setUserLoggedIn(user) {
    return {
        type: SET_USER_LOGGED_IN,
        user
    }
}

export function setUserInfo(user) {
    console.log(user)
    return {
        type: SET_USER_INFO,
        payload: user
    }
}



export function clearUserInfo() {
    return {
        type: CLEAR_USER_INFO
    }
}

export function initiateLogin(user) {

    return function sideEffect(dispatch, getState) {
        dispatch(requestLogin())

        fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)

        }).then(response => {
            console.log(response.ok)
            if (!response.ok)
                return dispatch(loginFailure())

            response.json().then(user => {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))

            })
        }).catch(error => console.log(error))
    }
}


export function initiateRegisterUser(user) {
    return function sideEffect(dispatch) {
        dispatch(registeringUser())

        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(response => {
            if (!response.ok)
                return dispatch(addUserFailed())

            response.text().then(text => {
                if (text === 'success')
                    // dispatch(initiateLogin(user))
                    console.log("user registered")

                else {
                    console.log("did not hit success")
                    dispatch(addUserFailed())
                }
            })
        }).catch(error => console.log(error))
    }
}


