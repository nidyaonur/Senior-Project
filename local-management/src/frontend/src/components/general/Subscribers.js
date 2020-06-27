import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubscribers } from "../../actions/subscribers";

export class Subscribers extends Component {
    constructor(props) {
        super(props);
        this.dateFormatter = this.dateFormatter.bind(this);
    }
    static propTypes = {
        subscribers: PropTypes.array.isRequired,
        getSubscribers: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getSubscribers();
    }
    dateFormatter(datenow) {
        var now = Date.now() / 1000;
        var secpassed = Math.floor(now - datenow);
        var res = "";
        var hour = 0;
        var min = 0;
        if (secpassed > 3599) {
            hour = Math.floor(secpassed / 3600);
            if (hour > 1) {
                res = res.concat(hour.toString()).concat("hours");
            } else {
                res = res.concat(hour.toString()).concat("hour");
            }
        }
        if (secpassed - hour * 3600 > 119) {
            min = Math.floor(secpassed - hour * 3600);
            res = res
                .concat(" ")
                .concat(Math.floor(min / 60).toString())
                .concat(" mins");
        } else if (
            secpassed - hour * 3600 < 120 &&
            secpassed - hour * 3600 > 60
        ) {
            min = Math.floor(secpassed - hour * 3600);
            res = res
                .concat(" ")
                .concat(Math.floor(min / 60).toString())
                .concat(" min");
        } else {
            res = "a few seconds";
        }
        res = res.concat(" ago");
        return res;
    }
    render() {
        return (
            <Fragment>
                <h2>Subscribers</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Signal Power</th>
                            <th>Last Updated</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.subscribers
                            .filter(
                                subscriber =>
                                    subscriber.username !== "robot" &&
                                    subscriber.username !== "target"
                            )
                            .map(subscriber => (
                                <tr key={subscriber.id}>
                                    <td>{subscriber.fullname}</td>
                                    <td>{subscriber.title}</td>
                                    <td>{subscriber.signalpower}</td>
                                    <td>
                                        {this.dateFormatter(subscriber.updated)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    subscribers: state.subscribers.subscribers
});

export default connect(mapStateToProps, { getSubscribers })(Subscribers);
