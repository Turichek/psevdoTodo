const defaulteState = {
    value: Date.now(),
}

const ADD_MAINLISTID = 'ADD_MAINLISTID';

export const mainListIdReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_MAINLISTID:
            return { ...state, value: action.payload }

        default:
            return state;
    }
}

export const addMainListIdAction = (payload) => ({type: ADD_MAINLISTID, payload});