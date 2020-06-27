import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubscribers, deleteSubscriber } from "../../actions/subscribers";

export class Subscribers extends Component {
    static propTypes = {
        subscribers: PropTypes.array.isRequired,
        getSubscribers: PropTypes.func.isRequired,
        deleteSubscriber: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getSubscribers();
    }

    render() {
        return (
            <Fragment>
                <h2>Subscribers</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Title</th>
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
                                <tr key={subscriber.username}>
                                    <td>{subscriber.username}</td>
                                    <td>{subscriber.fullname}</td>
                                    <td>{subscriber.title}</td>
                                    <td>
                                        <button
                                            onClick={this.props.deleteSubscriber.bind(
                                                this,
                                                subscriber.username
                                            )}
                                            className="btn btn-danger btn-sm"
                                        >
                                            {" "}
                                            Delete
                                        </button>
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

export default connect(mapStateToProps, { getSubscribers, deleteSubscriber })(
    Subscribers
);
