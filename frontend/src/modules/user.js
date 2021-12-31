const REQUEST_LOGIN = 'REQUEST_LOGIN'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

const START_ADDING_USER = 'START_ADDING_USER'
const ADDING_USER = 'ADDING_USER'
const ADD_USER_FAILED = 'ADD_USER_FAILED'
const CANCEL_EDIT_USER ='CANCEL_EDIT_USER'
const START_EDITING_USER = 'START_EDITING_USER'

const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN'
const EDITING_USER = 'EDITING_USER'
const EDIT_USER_FAILED = 'EDIT_USER_FAILED'
const DELETING_USER = 'DELETING_USER'
const DELETING_USER_FAILED = 'DELETING_USER_FAILED'
const GETTING_USERS = 'GETTING_USERS'
const GET_USERS_FAILED = 'GET_USERS_FAILED'

const UPDATE_USER_FNAME = 'UPDATE_USER_FNAME'
const USERS_UPDATED = 'USERS_UPDATED'
const UPDATE_USER = 'UPDATE_USER'




const initialState = {
    isLoggedIn: false,
    loginPending: false,
    loginErrorOccurred: false,
    users: [],
    loggedInUser: {},
    userForm:{},
    registerErrorOccurred: false,
    userToEdit: {},
    showEditUser: false,
    gettingUsers: false,
    id: '',
    firstName: '',
    lastName: '',
    role: '',
    authLevel: '',
    email: '',
    password: '',
    hideTable: true,
    addingUser: false
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

        case ADDING_USER:
            return {
                ...state,
                showEditUser: false,
                addingUser: true
            }

        case START_ADDING_USER:
            return {
                ...state,
                showEditUser: true,
                firstName: '',
                lastName: '',
                role: '',
                authLevel: '',
                email: '',
                password: ''
            }
        case ADD_USER_FAILED:
            return {
                ...state,
                registerErrorOccurred: true
            }
        case EDITING_USER:
            console.log("inside editing_user " + action.user.id)
            return {
                ...state,
                showEditUser: true,
                userToEdit: action.user,

            }

        case EDIT_USER_FAILED:
            return {
                ...state,
                showEditUser: false
            }

        case CANCEL_EDIT_USER:
            return {
                ...state,
                showEditUser: false,
                id: '',
                firstName: '',
                lastName: '',
                role: '',
                authLevel: '',
                email: '',
                password: ''
            }

        case GETTING_USERS:
            return {
                ...state,
                gettingUsers: true,
                hideTable: false
            }

        case UPDATE_USER:
            return {
                ...state,
                showEditUser: true,
                firstName: '',
                lastName: '',
                role: '',
                authLevel: '',
                email: '',
                password: ''
            }

        case UPDATE_USER_FNAME:
            return {
                ...state,
                firstName: action.firstName
            }

        case GET_USERS_FAILED:
            return {
                ...state,
                gettingUsers: false
            }

        case DELETING_USER:
            return {
                ...state

            }

        case USERS_UPDATED:
            return {
                ...state,
                users: action.users
            }

        default:
            return state
    }
}

export function updateUserFname(firstName) {
    return {
        type: UPDATE_USER_FNAME,
        firstName
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

export function startAddingUser(){
    return {
        type: START_ADDING_USER
    }
}

function addingUser() {
    return {
        type: ADDING_USER
    }
}

export function startEditingUser(user) {
    console.log("inside editingUser")
    return {
        type: EDITING_USER,
        user
    }
}

function addUserFailed() {
    return {
        type: ADD_USER_FAILED
    }
}

export function cancelEditUser(){
    return {
        type: CANCEL_EDIT_USER
    }
}

function setUserLoggedIn(user) {
    return {
        type: SET_USER_LOGGED_IN,
        user
    }
}

export function gettingUsers() {
    return {
        type: GETTING_USERS
    }
}

function getUsersFailed() {
    return {
        type: GET_USERS_FAILED
    }
}

function updateUser(){
    return{type: UPDATE_USER}
}
function usersUpdated(users) {
    return {
        type: USERS_UPDATED,
        users
    }
}

function deletingUser() {
    console.log("trying to delete")
    return {
        type: DELETING_USER
    }
}

function deleteUserFailed() {
    return {
        type: DELETING_USER_FAILED
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

            response.json().then(user => {
                console.log(user)
                if (user.authLevel === 4) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    dispatch(initiateGetUsers())
                    // dispatch(navigate(admin))

                } else if (user.authLevel === 3) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    //dispatch(navigate(shopkeeper))
                } else if (user.authLevel === 2) {
                    dispatch(loginSuccess())
                    dispatch(setUserLoggedIn(user))
                    //dispatch(navigate(home))
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

export function initiateEditUser(user) {
    console.log("logging user from initiateEditUser" + user)
    console.log(user.id, user.authLevel, user.firstName, user.lastName, user.password)
    return function sideEffect(dispatch, getState) {
        dispatch(startEditingUser(user))

    }
}

//=======================
export function submitEditUser(user){
    return function sideEffect(dispatch, getState) {

    fetch("http://localhost:8080/api/users/edit", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok)
            return dispatch(addUserFailed())

        response.text().then(text => {
            if (text === 'success') {
                dispatch(initiateGetUsers())
                console.log("user registered")
            }

            else {
                console.log("did not hit success")
                dispatch(addUserFailed())
            }
        })
    }).catch(error => console.log(error))
}}

    //===============

export function initiateGetUsers() {
    console.log("inside initiateGetUsers")
    return function sideEffect(dispatch, getState) {
        dispatch(gettingUsers())

        fetch('http://localhost:8080/api/users/all', {
            method: 'GET'
        }).then(response => {
            if (!response.ok)
                return dispatch (getUsersFailed())

            response.json().then(users => {
                dispatch(usersUpdated(users))
            })
        }).catch(error => console.log(error))
    }
}

export function initiateDeleteUser(id) {
    console.log("deleting " + id)
    return function sideEffect(dispatch) {
        dispatch(deletingUser())
        fetch(`http://localhost:8080/api/users/delete/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if(!response.ok)
                return dispatch(deleteUserFailed())

            response.text().then(text => {
                if (text === 'success')
                    dispatch(initiateGetUsers())
                else
                    dispatch(deleteUserFailed())
            })
        }).catch(error => console.log(error))
    }
}

