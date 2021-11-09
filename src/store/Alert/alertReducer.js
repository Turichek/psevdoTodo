import { OPEN_CLOSE_ALERT } from "./constants";

const defaulteState = {
    open: false,
    text: '',
    severity: 'info',
}

export const alertReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case OPEN_CLOSE_ALERT:
            return { ...state, open: action.payload.open, text: action.payload.text, severity: action.payload.severity}

        default:
            return state;
    }
}


