import { OPEN_CLOSE_MODAL } from "./constants";

const defaulteState = {
    open: false,
    text: '',
    parent: -1,
}

export const modalOpenReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case OPEN_CLOSE_MODAL:
            return { ...state, 
                open: action.payload.open, 
                text: action.payload.text, 
                parent: action.payload.parent
            }

        default:
            return state;
    }
}