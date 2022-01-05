import {initiateGetProducts} from "./shopkeeper";
import {deleteUserRequest, editUserRequest} from "../services/userService";
import {useNavigate} from "react-router";

const REQUEST_LOGIN = 'REQUEST_LOGIN'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const REGISTERING_USER = 'REGISTERING_USER'
const ADD_USER_FAILED = 'ADD_USER_FAILED'
const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN'
const SET_USER_INFO = 'SET_USER_INFO'
const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_ADDRESS1 = 'UPDATE_ADDRESS1'
const UPDATE_ADDRESS2 = 'UPDATE_ADDRESS2'
const UPDATE_CITY = 'UPDATE_CITY'
const UPDATE_STATE = 'UPDATE_STATE'
const UPDATE_ZIPCODE = 'UPDATE_ZIPCODE'
const EDIT_INFO_FAILED = 'EDIT_INFO_FAILED'
const DELETE_REQUEST_FAILED = 'DELETE_REQUEST_FAILED'


const initialState = {
    isLoggedIn: false,
    loginPending: false,
    loginErrorOccurred: false,
    users: [],
    loggedInUser: {},
    userForm:{},
    registerErrorOccurred: false,
    errorMessage: '',
    showInfo: false,
    userInfo: {},
    password: '',
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
                loginPending: false,
                loggedInUser: {},
                errorMessage: ''
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
            }

        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case UPDATE_ADDRESS1:
            return {
                ...state,
                address1: action.payload
            }
        case UPDATE_ADDRESS2:
            return {
                ...state,
                address2: action.payload
            }
        case UPDATE_CITY:
            return {
                ...state,
                city: action.payload
            }
        case UPDATE_STATE:
            return {
                ...state,
                state: action.payload
            }
        case UPDATE_ZIPCODE:
            return {
                ...state,
                zipcode: action.payload
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

export function updatePassword(password) {
    return {type: UPDATE_PASSWORD, payload: password}
}
export function updateAddress1(address1) {
    return {type: UPDATE_ADDRESS1, payload: address1}
}

export function updateAddress2(address2) {
    return {type: UPDATE_ADDRESS2, payload: address2}

}

export function updateCity(city) {
    return {type: UPDATE_CITY, payload: city}

}

export function updateState(state) {
    return {type: UPDATE_STATE, payload: state}

}

export function updateZipcode(zipcode) {
    return {type: UPDATE_ZIPCODE, payload: zipcode}

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

function editUserRequestFailed(errorMessage) {
    return {type: EDIT_INFO_FAILED, errorMessage}
}

function deleteRequestFailed(errorMessage) {
    return {type: DELETE_REQUEST_FAILED, payload: errorMessage}
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

export function initiateEditUserInfo(userToEdit) {
    return function userToEditSideEffect(dispatch) {
        editUserRequest(userToEdit).then(response => {
            if (response.status !== 200) {
                return dispatch(editUserRequestFailed('Edit Failed'))
            }
            else {
                dispatch(setUserLoggedIn(userToEdit))
            }
        })
            .catch(err => console.log('Error in Initiate edit user info', err))
    }
}

export function initiateDeleteUser(userId) {
    return function userToDelete(dispatch, getState) {
        console.log(userId)
        console.log()
        if (userId === getState().userReducer.loggedInUser.id) {
            deleteUserRequest(userId).then(response => {
                if (response.status !== 200)
                    dispatch(deleteRequestFailed('Could not delete your profile'))
                else
                    dispatch(logout())

            })
                .catch(err => console.log('Error with deleting user', err))
        } else
            dispatch(deleteRequestFailed('You are not logged in'))
    }
}

