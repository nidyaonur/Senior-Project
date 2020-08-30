import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubscriber } from "../../actions/subscribers";

export class Form extends Component {
    state = {
        username: "",
        email: "",
        fullname: "",
        title: "",
        password: ""
    };

    static propTypes = {
        addSubscriber: PropTypes.func.isRequired
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { username, email, fullname, title, password } = this.state;
        const subscriber = { username, email, fullname, title, password };
        this.props.addSubscriber(subscriber);
        this.setState({
            username: "",
            email: "",
            fullname: "",
            title: "",
            password: ""
        });
    };

    render() {
        const { username, email, fullname, title, password } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Subscriber</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            onChange={this.onChange}
                            value={username}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            onChange={this.onChange}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="fullname"
                            onChange={this.onChange}
                            value={fullname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <select
                            name="title"
                            onChange={this.onChange}
                            value={title}
                            className="form-control"
                        >
                            <option value="devops">Devops</option>
                            <option value="advisor">Advisor</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <textarea
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={this.onChange}
                            value={password}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addSubscriber })(Form);
