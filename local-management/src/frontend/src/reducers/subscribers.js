import {
    GET_SUBSCRIBERS,
    ADD_SUBSCRIBER,
    DELETE_SUBSCRIBER
} from "../actions/types.js";

const initialState = {
    subscribers: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SUBSCRIBERS:
            return {
                ...state,
                subscribers: action.payload
            };
        case DELETE_SUBSCRIBER:
            return {
                ...state,
                subscribers: state.subscribers.filter(
                    subscriber => subscriber.username !== action.payload
                )
            };
        case ADD_SUBSCRIBER:
            return {
                ...state,
                subscribers: [...state.subscribers, action.payload]
            };
        default:
            return state;
    }
}
