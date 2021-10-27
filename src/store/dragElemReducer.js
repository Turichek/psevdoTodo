const defaulteState = {
    elem: {},
}

const ADD_DRAGELEM = 'ADD_DRAGELEM';

export const dragElemReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_DRAGELEM:
            return { ...state, elem: action.payload }

        default:
            return state;
    }
}

export const addDragElemAction = (payload) => ({type: ADD_DRAGELEM, payload});