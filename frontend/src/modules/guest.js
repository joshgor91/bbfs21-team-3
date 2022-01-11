const SET_GUEST_STATE = "SET_GUEST_STATE"
const SET_DISABLE_GUEST_EMAIL = "SET_DISABLE_GUEST_EMAIL"
const SET_GUEST_TOTAL = "SET_GUEST_TOTAL"

const initialState = {
    guestEmail: "",
    guestTotal:0,
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
        case SET_GUEST_TOTAL:
            return {
                ...state,
                guestTotal: action.payload
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

export function setGuestTotal(value) {
    return {
        type:SET_GUEST_TOTAL,
        payload:value
    }
}