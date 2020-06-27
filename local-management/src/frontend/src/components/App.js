import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import SubDashboard from "./subscribers2/Dasboard.js";
import SubscriberDetail from "./subscribers/SubscriberDetail.js";
import Chat from "./chat/Chat";
import General from "./general/Dashboard";
import Alerts from "./layout/Alerts";
import Header from "./layout/Header";
import "../navbar/Navbar.css";
import cookie from "react-cookies";
import { HashRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import { getSubscribers } from "../actions/subscribers";
// Alert options
import "bootstrap/dist/css/bootstrap.min.css";
const alertOptions = {
    timeout: 3000,
    position: "top right"
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
        store.dispatch(getSubscribers());
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={Login} />
                                    <Route
                                        exact
                                        path="/subscribers"
                                        component={SubDashboard}
                                    />
                                    <Route
                                        exact
                                        path="/general"
                                        component={General}
                                    />
                                    <Route
                                        exact
                                        path="/subscribers/:slug"
                                        component={SubscriberDetail}
                                    />
                                    <Route
                                        exact
                                        path="/chats"
                                        component={Chat}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("app"));
export default App;
