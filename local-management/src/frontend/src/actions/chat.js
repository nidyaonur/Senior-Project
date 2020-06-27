import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { RECEIVED_MESSAGE, SENT_MESSAGE } from "./types";
function arr_diff(a1, a2) {
    var a = [],
        diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}
export const getMessage = () => (dispatch, getState) => {
    let chats = getState().chats.chats;
    let curTopics = Object.keys(chats);
    let listOfids = [];
    for (var i = 0; i < curTopics.length; i++) {
        for (var j = 0; j < chats[curTopics[i]].length; j++) {
            listOfids.push(chats[curTopics[i]][j].id);
        }
    }
    axios
        .get("/api/chat/getmsgs/", tokenConfig(getState))
        .then(res => {
            let id_list = res.data.map(a => a.id);
            for (var i = 0; i < id_list.length; i++) {
                if (!listOfids.includes(id_list[i])) {
                    dispatch({
                        type: RECEIVED_MESSAGE,
                        payload: res.data[i]
                    });
                }
            }
        })
        .catch(err => {
            console.log(err);
            //            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const sendMessage = value => (dispatch, getState) => {
    let newmsg = {
        message: value.msg,
        topic: value.topic
    };
    axios
        .post("/api/chat/sendmsg/", newmsg, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ sendMessage: "Message Sent" }));
            dispatch({
                type: SENT_MESSAGE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            //dispatch(returnErrors(err.response.data, err.response.status))
        });
};
