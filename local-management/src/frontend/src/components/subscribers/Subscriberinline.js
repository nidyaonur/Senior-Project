import React, { Component } from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";  
import { Switch } from '@material-ui/core';

class SubscriberInline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    };    

    render() {               
        return (
            <div>
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "fullname"
                        },
                        {
                            Header: "Info",
                            accessor: "url",
                            Cell: ({value}) => (<button>{value}</button>)
                        },
                        {
                            Header: "Delete",
                            accessor: "delete_url",
                            Cell: ({value}) => (<button>{value}</button>)
                        }
                    ]}
                    onFetchData={(state, instance) => {
                        let request = new XMLHttpRequest();
                        request.open("GET", '/api/subscribers', true);
                        request.send();
                        request.onload = function() {
                            if (request.status === 200) {
                                let response = JSON.parse(request.responseText);

                                for (var i = 0; i < response.length; i++) {
                                    var get_url = "http://3.135.239.150:8000/subscribers/" + response[i].slug
                                    response[i].url =  <a href={get_url}> See </a>
                                        var deletion_url = "http://83.135.239.15:0000/api/subscribers/" + response[i].slug + '/delete/'
                                    response[i].delete_url =  <a href={deletion_url}> Delete </a>
                                }

                                this.setState({
                                    data: response
                                })
                            }
                        }.bind(this);
                    }}
                    defaultPageSize={2}
                    className="-striped -highlight"
                    manual
                />
            </div>
        );
    }
}

export default SubscriberInline;
