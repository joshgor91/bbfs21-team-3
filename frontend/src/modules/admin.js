//Actions
const CREATE_USER = 'CREATE_USER'
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
    loggedInUser: '',
    registerErrorOccurred: false,
    users: [],
    userToEdit: undefined,
    showEditUser: false,
    gettingUsers: false,
    addingUser: false,
    deletingUser: false,
    editingUser: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_USER:
            return {
                ...state,
                showEditUser: false,
                addingUser: true,
            }

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

        default:
            return state
    }
}

//Action Creators



//Side Effects
export function initiateAddUser(user) {
    return function sideEffect(dispatch, getState) {
        dispatch(addingUser())

        fetch()
    }

}


