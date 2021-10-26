const defaulteState = {
    open: false,
    text: '',
    severity: 'info',
}

const OPEN_CLOSE_ALERT = 'OPEN_CLOSE_ALERT';

export const alertReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case OPEN_CLOSE_ALERT:
            return { ...state, open: action.payload.open, text: action.payload.text, severity: action.payload.severity}

        default:
            return state;
    }
}

export const openCloseAlertAction = (payload) => ({ type: OPEN_CLOSE_ALERT, payload });
