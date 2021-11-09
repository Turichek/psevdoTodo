import { ADD_ELEM, UPDATE_LIST, UPDATE_ELEMS, UPDATE_ELEM, REMOVE_ELEM, SET_LIST_DISABLED, SET_LIST_DRAGGABLE, SET_LIST_EDITABLE, SET_LIST_NAME, SET_LIST_TYPE } from "./constants"

const defaulteState = {
    id: Date.now(),
    name: '',
    elems: [],
    type: '',
    draggable: 'false',
    disabled: false,
    editable: false,
}

export const listReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_ELEM:
            return { ...state, elems: [...state.elems, action.payload] }

        case UPDATE_LIST:
            return {
                ...state,
                ...action.payload
            }

        case UPDATE_ELEMS:
            return { ...state, elems: action.payload }

        case UPDATE_ELEM:
            return {
                ...state, elems: state.elems.filter(elem => {
                    if (elem.id === action.payload.id) {
                        elem = action.payload
                    }
                    return state.elems;
                })
            }

        case REMOVE_ELEM:
            return { ...state, elems: state.elems.filter(elem => elem.id !== action.payload) }

        case SET_LIST_NAME:
            return {
                ...state,
                name: action.payload,
            }

        case SET_LIST_TYPE:
            return {
                ...state,
                type: action.payload,
            }

        case SET_LIST_DRAGGABLE:
            return {
                ...state,
                draggable: action.payload,
            }

        case SET_LIST_DISABLED:
            return {
                ...state,
                disabled: action.payload,
            }

        case SET_LIST_EDITABLE:
            return {
                ...state,
                editable: action.payload
            }

        default:
            return state;
    }
}
