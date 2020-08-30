import React, { Component } from "react";
import "whatwg-fetch";
import Dashboard from "./Dashboard";
import PropTypes from "prop-types";

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Dashboard />
            </div>
        );
    }
}
export default Chat;
