import { ADD_ELEM, UPDATE_LIST, UPDATE_ELEMS, UPDATE_ELEM, REMOVE_ELEM, SET_LIST_DISABLED, SET_LIST_DRAGGABLE, SET_LIST_EDITABLE, SET_LIST_NAME, SET_LIST_TYPE } from "./constants"

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