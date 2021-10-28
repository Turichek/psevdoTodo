const defaulteState = {
    open: false,
    text: '',
    parent: -1,
}

const OPEN_CLOSE_MODAL = 'OPEN_CLOSE_MODAL';

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

export const openCloseModalAction = (payload) => ({type: OPEN_CLOSE_MODAL, payload});