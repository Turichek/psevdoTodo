const defaulteState = {
    id: Date.now(),
    name: '',
    elems: [],
    type: '',
    draggable: 'false',
    disabled: false,
    editable: false,
}

const ADD_ELEM = 'ADD_ELEM';
const UPDATE_ELEM = 'UPDATE_ELEM';
const UPDATE_ELEMS = 'UPDATE_ELEMS';
const UPDATE_LIST = 'UPDATE_LIST';
const REMOVE_ELEM = 'REMOVE_ELEM';
const SET_LIST_NAME = 'SET_LIST_NAME';
const SET_LIST_TYPE = 'SET_LIST_TYPE';
const SET_LIST_DRAGGABLE = 'SET_LIST_DRAGGABLE';
const SET_LIST_DISABLED = 'SET_LIST_DISABLED';
const SET_LIST_EDITABLE = 'SET_LIST_EDITABLE';

export const listReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_ELEM:
            return { ...state, elems: [...state.elems, action.payload] }

        case UPDATE_LIST:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                elems: action.payload.elems,
                type: action.payload.type,
                draggable: action.payload.draggable,
                disabled: action.payload.disabled,
                editable: action.payload.editable,
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

export const addElemAction = (payload) => ({ type: ADD_ELEM, payload });
export const updateElemAction = (payload) => ({ type: UPDATE_ELEM, payload });
export const updateElemsAction = (payload) => ({ type: UPDATE_ELEMS, payload });
export const updateListAction = (payload) => ({ type: UPDATE_LIST, payload });
export const removeElemAction = (payload) => ({ type: REMOVE_ELEM, payload });
export const setListName = (payload) => ({ type: SET_LIST_NAME, payload });
export const setListType = (payload) => ({ type: SET_LIST_TYPE, payload });
export const setListDraggable = (payload) => ({ type: SET_LIST_DRAGGABLE, payload });
export const setListDisabled = (payload) => ({ type: SET_LIST_DISABLED, payload });
export const setListEditable = (payload) => ({ type: SET_LIST_EDITABLE, payload });