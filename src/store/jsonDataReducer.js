const defaulteState = {
    str: '',
}

const ADD_JSON = 'ADD_JSON';

export const jsonDataReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_JSON:
            return { ...state, str: action.payload }

        default:
            return state;
    }
}

export const addJsonAction = (payload) => ({type: ADD_JSON, payload});