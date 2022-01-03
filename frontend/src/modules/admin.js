//Actions
const CREATE_USER = 'CREATE_USER'
const CREATE_USER_FAILED = 'CREATE_USER_FAILED'
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
const DELETE_USER = 'DELETE_USER'
const EDIT_USER = 'EDIT_USER'
const USERS_UPDATED = 'USERS_UPDATED'
const GETTING_USERS = 'GETTING_USERS'
const GET_USERS_FAILED = 'GET_USERS_FAILED'

//Reducer

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
    isEditing:false,
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

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_USER:
            return {
                ...state,
                showEditUser: false,
                isEditing: false,
                addingUser: true,
                firstName: '',
                lastName: '',
                role: '',
                authLevel: '',
                email: '',
                password: ''
            }
        // case CREATE_USER:
        //     return {
        //         ...state,
        //         newUsers: [...state.users,action.user]
        //     }
        // case START_ADDING_USER:
        //     return {
        //         ...state,
        //         showEditUser: true,
        //         firstName: '',
        //         lastName: '',
        //         role: '',
        //         authLevel: '',
        //         email: '',
        //         password: ''
        //     }

        case DELETE_USER:
            return {

            }

        case EDIT_USER:
            return {

            }

        case GETTING_USERS:
            return {
                ...state,
                gettingUsers: true
            }

        case GET_USERS_FAILED:
            return {
                ...state,
                gettingUsers: false
            }

        case USERS_UPDATED:
            return {
                ...state,
                users: action.users,
                addingUser: false,
                showEditUser: false
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                newLoginPending: false,
                isNewLoggedIn: true
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                newLoginPending: false,
            }

        default:
            return state
    }
}

//Action Creators
function createUserSuccess() {
    return {
        type: CREATE_USER_SUCCESS
    }
}
function createUser() {
    return {
        type: CREATE_USER
    }
}

function createUserFailed() {
    return {
        type: CREATE_USER_FAILED
    }
}


//Side Effects

export function initiateCreateUser(credentials) {
    return function sideEffect(dispatch, getState) {
        dispatch(createUser())

        fetch("http://localhost:8080/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            console.log(credentials)
            if (!response.ok)
                return dispatch(createUserFailed())

            response.text().then(text => {
                if (text === 'success')
                    dispatch(createUserSuccess(credentials.username))
                // console.log("user registered")

                else {
                    console.log("did not hit success")
                    dispatch(createUserFailed())
                    alert("Signup is invalid! Please try again.")
                }
            })
        }).catch(error => console.log(error))
    }
}


