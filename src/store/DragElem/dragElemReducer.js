import { ADD_DRAGELEM } from "./constants";

const defaulteState = {
    elem: {},
}

export const dragElemReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_DRAGELEM:
            return { ...state, elem: action.payload }

        default:
            return state;
    }
}