import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { jsonDataReducer } from './JsonData/jsonDataReducer';
import { listReducer } from './List/listReducer';
import { alertReducer } from './Alert/alertReducer';
import { dragElemReducer } from './DragElem/dragElemReducer';
import { modalOpenReducer } from './Modal/modalOpenReducer';
import { psevdoCodeReducer } from './PsevdoCode/psevdoCodeReducer';
import { additionalListsReducer } from './AdditionalLists/additionalListsReducer';

const rootReducer = combineReducers({
    json: jsonDataReducer,
    list: listReducer,
    alert: alertReducer,
    dragElem: dragElemReducer,
    modal: modalOpenReducer,
    psevdo: psevdoCodeReducer,
    lists: additionalListsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());