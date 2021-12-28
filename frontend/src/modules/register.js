const CREATE_USER = 'CREATE_USER'
const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'



const initialState = {
    signupPending: false,
    isSignedup: false,
    // users: {username: 'esma', password: 'abc'},
    newUsers:[{email: '', newUsername: '', newUserPassword: ''}],
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case CREATE_USER:
            return {
                ...state,
                newUsers: [...state.users, action.user]
            }

        case SIGNUP_REQUEST:
            return {
                ...state,
                newLoginPending: true,
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                newLoginPending: false,
                isNewLoggedIn: true
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                newLoginPending: false,
            }

    }
}


function signUpSuccess() {
    return {
        type: SIGNUP_SUCCESS
    }
}

function signUpFailure() {
    return {
        type: SIGNUP_FAILURE
    }
}


function signUpRequest(user) {
    return {
        type: SIGNUP_REQUEST,
        user
    }
}

export function initiateCreateUser(credentials) {
    console.log(credentials.username)
    return function sideEffect(dispatch) {
        dispatch(signUpRequest())
        fetch("http://localhost:8080/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            if (response.ok)
                return dispatch(signUpSuccess( "success"))

            response.text().then(text => {
                if (text === "success") dispatch(signUpSuccess(credentials.username))
                else dispatch(signUpFailure(text))
                alert("Signup is invalid! Please try again.")
            })
        }).catch(error => console.log(error))
    }
}
