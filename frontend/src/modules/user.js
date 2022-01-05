
const REQUEST_LOGIN = 'REQUEST_LOGIN'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const REGISTERING_USER = 'REGISTERING_USER'
const ADD_USER_FAILED = 'ADD_USER_FAILED'
const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN'



const initialState = {
    isLoggedIn: false,
    loginPending: false,
    loginErrorOccurred: false,
    users: [],
    loggedInUser: {},
    userForm:{},
    registerErrorOccurred: false
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

        default:
            return state
    }
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

export function setUserLoggedIn(user) {
    return {
        type: SET_USER_LOGGED_IN,
        user
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
                console.log(user)
                if (user.authLevel === 3) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    // dispatch(initiateGetUsers())
                    // dispatch(navigate(admin))
                }
                else if (user.authLevel === 2) {

                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    //dispatch(navigate(home))
                } else if (user.authLevel === 1) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    //dispatch(navigate(home))
                }
                else if (user.authLevel === 1) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    //dispatch(navigate(shopkeeper))
                }
                else
                    dispatch(loginFailure())
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


