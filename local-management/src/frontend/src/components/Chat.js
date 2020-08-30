import React, { Component } from 'react';
import 'whatwg-fetch'
import Dashboard from './Dashboard'
import Store from './Store'
class Chat extends Component {
    constructor(props){
        super(props)    
    }

    render() {
        return (
            <div>
                <Store>
                    <Dashboard />
                </Store>
            </div>
        );
    }
}

export default Chat;
