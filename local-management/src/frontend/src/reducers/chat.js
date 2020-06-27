import { RECEIVED_MESSAGE } from "../actions/types.js";

const initialState = {
    chats: { General: [], MBSTeam: [] }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVED_MESSAGE:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload.topic]: [
                        ...state.chats[action.payload.topic],
                        {
                            from: action.payload.fullname,
                            msg: action.payload.message,
                            id: action.payload.id,
                            timestamp: action.payload.timestamp
                        }
                    ]
                }
            };
        default:
            return state;
    }
}
