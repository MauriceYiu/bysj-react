import * as actionTypes from "./../constants";

const initialState = {};

export default function user(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RECEIVE_ERR:
            state = { ...action.data
            };
            return state;
        case actionTypes.AUTH_SUCCESS:
            state = { ...action.data
            };
            return state;
        default:
            return state;
    }
}