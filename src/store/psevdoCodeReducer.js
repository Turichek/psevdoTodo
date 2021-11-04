const defaulteState = {
    text: '"nameList":[\n\ttype: \n]\n\n"Enter the name of the list here":\ndraggable: false\ndisabled: false\neditable: false\ntype: ',
}

const ADD_PSEVDOCODE = 'ADD_PSEVDOCODE';

export const psevdoCodeReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_PSEVDOCODE:
            return { ...state, text: action.payload }

        default:
            return state;
    }
}

export const addPsevdoCodeAction = (payload) => ({type: ADD_PSEVDOCODE, payload});