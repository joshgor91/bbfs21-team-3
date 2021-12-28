const REQUEST_LOGIN = 'REQUEST_LOGIN'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ADDING_USER = 'ADDING_USER'
const ADD_USER_FAILED = 'ADD_USER_FAILED'
const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN'



const initialState = {
    isLoggedIn: false,
    loginPending: false,
    loginErrorOccurred: false,
    users: [],
    loggedInUser:'',
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

        case LOGIN_ERROR:
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

        case ADD_USER_FAILED:
            return {
                ...state,
                registerErrorOccurred: true
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
    return {type: LOGIN_ERROR,
        payload: errorMessage}
}

export function loginSuccess() {
    return {type: LOGIN_SUCCESS,
    }
}

export function logout() {
    return {type: LOGOUT}
}


function addingUser() {
    return {
        type: ADDING_USER
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

            if (!response.ok)
                return dispatch(loginFailure())

            response.json().then(json => {

                if (json.length > 0) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(json[0].username))

                }
                else
                    dispatch(loginFailure())
            })
        }).catch(error => console.log(error))
    }
}


export function initiateAddUser(user) {
    return function sideEffect(dispatch, getState) {
        dispatch(addingUser())

        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(response => {
            console.log(response)
            if (!response.ok)
                return dispatch(addUserFailed())

            response.text().then(text => {
                if (text === 'success')
                    dispatch(initiateLogin(user))
                else
                    dispatch(addUserFailed())
            })
        }).catch(error => console.log(error))
    }
}

