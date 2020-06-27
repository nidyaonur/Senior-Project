import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item nav-link">
                        {user ? `Welcome ${user.username}` : ""}
                    </li>
                    <li className="nav-item">
                        <Link to="/general" className="nav-link">
                            General
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/chats" className="nav-link">
                            Chats
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Subscribers" className="nav-link">
                            Management
                        </Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button
                        onClick={this.props.logout}
                        className="nav-link btn btn-info btn-sm text-light"
                    >
                        Logout
                    </button>
                </form>
            </Fragment>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        Mobile Base Station
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
