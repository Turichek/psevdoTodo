import { ADD_ADDITIONAL_LISTS } from "./constants";

const defaulteState = {
    lists: [],
}

export const additionalListsReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_ADDITIONAL_LISTS:
            return { ...state, lists: action.payload }

        default:
            return state;
    }
}

