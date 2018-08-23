import * as actionTypes from "./../constants/chat";

const initialState = null;

export default function chat(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RECEIVE_MSG:
            state = action.data;
            return state;
        default:
            return state;
    }
}