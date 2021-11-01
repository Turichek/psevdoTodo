import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { jsonDataReducer } from './jsonDataReducer';
import { listReducer } from './listReducer';
import { mainListIdReducer } from './mainListIdReducer';
import { alertReducer } from './alertReducer';
import { dragElemReducer } from './dragElemReducer';
import { modalOpenReducer } from './modalOpenReducer';
import { psevdoCodeReducer } from './psevdoCodeReducer';

const rootReducer = combineReducers({
    json: jsonDataReducer,
    list: listReducer,
    mainListId: mainListIdReducer,
    alert: alertReducer,
    dragElem: dragElemReducer,
    modal: modalOpenReducer,
    psevdo: psevdoCodeReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());