import { ADD_PSEVDOCODE } from "./constants";

const defaulteState = {
    text: '"nameList":[\n\ttype: \n]\n\n"Enter the name of the list here":\ndraggable: false\ndisabled: false\neditable: false\ntype: ',
}

export const psevdoCodeReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_PSEVDOCODE:
            return { ...state, text: action.payload }

        default:
            return state;
    }
}