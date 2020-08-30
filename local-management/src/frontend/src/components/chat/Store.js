import React, { Component, useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "whatwg-fetch";
import cookie from "react-cookies";
import { tokenConfig } from "../../actions/auth";
import { getMessage, sendMessage } from "../../actions/chat";
var initState = {
    General: [],
    MBSTeam: []
};
var i = 0;

const [allChats, dispatch] = React.useReducer(reducer, initState);
const user = "aaron" + Math.random(100).toFixed(2);

class Store extends Component {
    static PropTypes = {
        messages: PropTypes.array.isRequired,
        getMessage: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired
    };
    componentDidMount() {
        var intervalId = setInterval(this.props.getMessage, 1000);
    }

    render() {
        return (
            <CTX.Provider value={{ allChats, sendChatAction, user }}>
                {props.children}
            </CTX.Provider>
        );
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "RECEIVE_MESSAGE":
            console.log("reducerda receive message'a girdim");
            return {
                ...state,
                [action.payload.topic]: [
                    ...state[action.payload.topic],
                    {
                        from: action.payload.from,
                        msg: action.payload.msg
                    }
                ]
            };
        default:
            return state;
    }
}

function sendchataction(value) {
    console.log("send cagrildi", value);
    let newdata = {
        message: value.msg,
        topic: value.topic
    };
    const endpoint = "/api/chat/sendmsg/";
    const csrftoken = cookie.load("csrftoken");
    const thiscomp = this;
    if (csrftoken !== undefined) {
        let lookupoptions = {
            method: "post",
            headers: {
                "content-type": "application/json",
                "x-csrftoken": csrftoken
            },
            body: json.stringify(newdata),
            credentials: "include"
        };

        fetch(endpoint, lookupoptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (responsedata) {
                console.log("bu senddeki response data", responsedata);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
function getMessageAction() {
    const endpoint = "/api/chat/getmsgs/";
    let thisComp = this;
    const csrfToken = tokenConfig(getState);
    let lookupOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        }
    };

    fetch(endpoint, lookupOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (responseData) {
            //console.log(responseData)
            //TODO: Gelen datayi parse ederken kullandigin seyleri buraya aktarabilirsin
            processIncomingData(responseData);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function processIncomingData(responseData) {
    for (i; i < responseData.length; i++) {
        var currentTopic = responseData[i].topic;

        if (initState.hasOwnProperty(currentTopic)) {
            initState[currentTopic].push({
                from: responseData[i].fullname,
                msg: responseData[i].message
            });
        } else {
            initState[currentTopic] = [];
            initState[currentTopic].push({
                from: responseData[i].fullname,
                msg: responseData[i].message
            });
        }
    }

    return initState;
}
/*
export default function Store(props) {
    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    );
}*/
// const initState = {
//     general: [
//         {from: 'aaron', msg: 'hello'},
//         {from: 'arnold', msg: 'hello'},
//         {from: 'archer', msg: 'hello'},
//     ],
//     topic2: [
//         {from: 'alfa', msg: 'hello'},
//         {from: 'beta', msg: 'hello'},
//         {from: 'gama', msg: 'hello'},
//     ]
// }

// const incomingState = [
//     {
//         "message": "team den",
//         "sender": 4,
//         "topic": "MBSTeam"
//     },
//     {
//         "message": "adminn",
//         "sender": 1,
//         "topic": "MBSTeam"
//     },
//     {
//         "message": "teammm",
//         "sender": 2,
//         "topic": "MBSTeam"
//     }
// ]
