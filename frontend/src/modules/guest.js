const SET_GUEST_STATE = "SET_GUEST_STATE"

const initialState = {
    guestEmail: ""
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_GUEST_STATE:
            return {
                [action.name]: action.value
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