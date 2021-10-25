const defaulteState = {
    elems: [],
}

const ADD_ELEM = 'ADD_ELEM';
const UPDATE_ELEM = 'UPDATE_ELEM';
const UPDATE_LIST = 'UPDATE_LIST';
const REMOVE_ELEM = 'REMOVE_ELEM';

export const listReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_ELEM:
            return { ...state, elems: [...state.elems, action.payload] }

        case UPDATE_LIST:
            return { ...state, elems: action.payload }

        case UPDATE_ELEM:
            return {
                ...state, elems: state.elems.filter(elem => {
                    if (elem.id === action.payload.id) {
                        elem.childs = action.payload.childs
                    }
                    return state.elems;
                })
            }

        case REMOVE_ELEM:
            return { ...state, elems: state.elems.filter(elem => elem.id !== action.payload) }

        default:
            return state;
    }
}

export const addElemAction = (payload) => ({ type: ADD_ELEM, payload });
export const updateElemAction = (payload) => ({ type: UPDATE_ELEM, payload });
export const updateListAction = (payload) => ({ type: UPDATE_LIST, payload });
export const removeElemAction = (payload) => ({ type: REMOVE_ELEM, payload });