import { ADD_JSON } from "./constants";

const defaulteState = {
    str: '',
}

export const jsonDataReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_JSON:
            return { ...state, str: action.payload }

        default:
            return state;
    }
}

