import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SUBSCRIBERS, DELETE_SUBSCRIBER, ADD_SUBSCRIBER } from "./types";

// GET SUBSCRIBERS
export const getSubscribers = () => (dispatch, getState) => {
    axios
        .get("/api/subscribers/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SUBSCRIBERS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// DELETE LEAD
export const deleteSubscriber = username => (dispatch, getState) => {
    axios
        .delete(`/api/subscribers/${username}/delete/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_SUBSCRIBER,
                payload: username
            });
        })
        .catch(err => console.log(err));
};

// ADD SUBSCRIBER
export const addSubscriber = subscriber => (dispatch, getState) => {
    axios
        .post("/api/subscribers/create/", subscriber, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_SUBSCRIBER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};
