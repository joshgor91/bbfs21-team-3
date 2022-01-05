//Actions
const USERS_UPDATED = 'USERS_UPDATED'
const GET_USERS_FAILED = 'GET_USERS_FAILED'

const ADDING_USER = 'ADDING_USER'
const START_ADDING_USER = 'START_ADDING_USER'
const ADD_USER_FAILED = 'ADD_USER_FAILED'
// Editing
const EDITING_USER = 'EDITING_USER'
const EDIT_USER_FAILED = 'EDIT_USER_FAILED'
const CANCEL_EDIT_USER = 'CANCEL_EDIT_USER'

const UPDATE_USER = 'UPDATE_USER'
const GETTING_USERS = 'GETTING_USERS'
//delete
const DELETING_USER = 'DELETE_USER'
const DELETING_USER_FAILED = 'DELETING_USER_FAILED'


//Reducer

const initialState = {
    loginPending: false,
    users: [],
    loggedInUser: {},
    userForm:{},
    registerErrorOccurred: false,
    userToEdit: {},
    showEditUser: false,
    isEditing: false,
    gettingUsers: false,
    id: '',
    firstName: '',
    lastName: '',
    role: '',
    authLevel: '',
    email: '',
    password: '',
    hideTable: true,
    addingUser: false,
    errorMessage: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ADDING_USER:
            return {
                ...state,
                showEditUser: false,
                addingUser: true
            }

        case START_ADDING_USER:
            console.log("starting to add user")
            return {
                ...state,
                showEditUser: true,
                isEditing: false,
                firstName: '',
                lastName: '',
                role: '',
                authLevel: '',
                email: '',
                password: '',
                registerErrorOccurred: false
            }
        case ADD_USER_FAILED:
            return {
                ...state,
                registerErrorOccurred: true,
                errorMessage: action.payload
            }
        case EDITING_USER:
            console.log("inside editing_user " + action.user.id)
            return {
                ...state,
                showEditUser: true,
                isEditing: true,
                registerErrorOccurred: false
            }

        case EDIT_USER_FAILED:
            return {
                ...state,
                showEditUser: false,
                isEditing: false,
                registerErrorOccurred: true
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
                password: '',
                isEditing: false
            }

        case GETTING_USERS:
            return {
                ...state,
                gettingUsers: true,
                showEditUser: false,
                hideTable: false,
                registerErrorOccurred: false
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

function startEditingUser(user) {
    console.log("inside editingUser")
    return {
        type: EDITING_USER,
        user
    }
}

function addUserFailed(errorMessage) {
    return {
        type: ADD_USER_FAILED,
        payload: errorMessage
    }
}

function editUserFailed(){
    return {
        type: EDIT_USER_FAILED
    }
}

export function cancelEditUser(){
    return {
        type: CANCEL_EDIT_USER
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

//Side Effects

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
                    dispatch(addUserFailed("Unable to add user"))
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
                return dispatch(editUserFailed())

            response.text().then(text => {
                if (text === 'success') {
                    dispatch(initiateGetUsers())
                    console.log("user registered")
                }

                else {
                    console.log("did not hit success")
                    dispatch(editUserFailed())
                }
            })
        }).catch(error => console.log(error))
    }}

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
