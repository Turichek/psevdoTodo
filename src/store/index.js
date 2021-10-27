import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { jsonDataReducer } from './jsonDataReducer';
import { listReducer } from './listReducer';
import { mainListIdReducer } from './mainListIdReducer';
import { alertReducer } from './alertReducer';

const rootReducer = combineReducers({
    json: jsonDataReducer,
    list: listReducer,
    mainListId: mainListIdReducer,
    alert: alertReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());