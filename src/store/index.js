import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { jsonDataReducer } from './jsonDataReducer';
import { listReducer } from './listReducer';
import { alertReducer } from './alertReducer';
import { dragElemReducer } from './dragElemReducer';
import { modalOpenReducer } from './modalOpenReducer';
import { psevdoCodeReducer } from './psevdoCodeReducer';
import { listsReducer } from './listsReducer';

const rootReducer = combineReducers({
    json: jsonDataReducer,
    list: listReducer,
    alert: alertReducer,
    dragElem: dragElemReducer,
    modal: modalOpenReducer,
    psevdo: psevdoCodeReducer,
    lists: listsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());