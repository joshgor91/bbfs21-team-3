const SET_GUEST_STATE = "SET_GUEST_STATE"
const SET_DISABLE_GUEST_EMAIL = "SET_DISABLE_GUEST_EMAIL"

const initialState = {
    guestEmail: "",
    disableEmail:false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_GUEST_STATE:
            return {
                ...state,
                [action.name]: action.value
            }
        case SET_DISABLE_GUEST_EMAIL:
            return {
                ...state,
                disableEmail: action.payload
            }
        default:
            return state
    }
}

export function setGuestState(name, value) {
    return {
        type:SET_GUEST_STATE,
        name,
        value
    }
}
export function disableGuestEmailField(value) {
    return {
        type:SET_DISABLE_GUEST_EMAIL,
        payload:value
    }
}