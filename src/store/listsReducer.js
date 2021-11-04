const defaulteState = {
    lists: [],
}

const ADD_LISTS = 'ADD_LISTS';

export const listsReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_LISTS:
            return { ...state, lists: action.payload }

        default:
            return state;
    }
}

export const addListsAction = (payload) => ({type: ADD_LISTS, payload});