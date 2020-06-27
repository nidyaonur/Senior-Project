import React, { Component, Fragment } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubscribers } from "../../actions/subscribers";
import { FaUserAlt } from "react-icons/fa";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
function Map({ subscribers }) {
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);
    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedSubscriber(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{
                lat: subscribers.find(sub => {
                    return sub.username === "robot";
                }).latitude,
                lng: subscribers.find(sub => {
                    return sub.username === "robot";
                }).longitude
            }}
        >
            {subscribers.map(subscriber => (
                <Marker
                    key={subscriber.id}
                    position={{
                        lat: parseFloat(subscriber.latitude),
                        lng: parseFloat(subscriber.longitude)
                    }}
                    onClick={() => {
                        setSelectedSubscriber(subscriber);
                    }}
                    icon={
                        subscriber.username === "robot"
                            ? {
                                  url: `http://icons.iconarchive.com/icons/proycontec/robots/32/robot-network-icon.png`,
                                  scaledSize: new window.google.maps.Size(
                                      25,
                                      25
                                  )
                              }
                            : subscriber.username === "target"
                            ? {
                                  url: `http://icons.iconarchive.com/icons/ahmadhania/spherical/32/target-icon.png`,
                                  scaledSize: new window.google.maps.Size(
                                      25,
                                      25
                                  )
                              }
                            : subscriber.signalpower > 50
                            ? {
                                  url: `http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/32/User-Red-icon.png`,
                                  scaledSize: new window.google.maps.Size(
                                      25,
                                      25
                                  )
                              }
                            : subscriber.signalpower < -50
                            ? {
                                  url: `http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/32/User-Green-icon.png`,
                                  scaledSize: new window.google.maps.Size(
                                      25,
                                      25
                                  )
                              }
                            : {
                                  url: `http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/32/User-Yellow-icon.png`,
                                  scaledSize: new window.google.maps.Size(
                                      25,
                                      25
                                  )
                              }
                    }
                />
            ))}

            {selectedSubscriber && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedSubscriber(null);
                    }}
                    position={{
                        lat: selectedSubscriber.latitude,
                        lng: selectedSubscriber.longitude
                    }}
                >
                    <div>
                        <h3>Name: {selectedSubscriber.fullname}</h3>
                        <p>Title: {selectedSubscriber.title}</p>
                        <p>Signal Power: {selectedSubscriber.signalpower}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
export class Maps extends Component {
    static propTypes = {
        subscribers: PropTypes.array.isRequired,
        getSubscribers: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.interval = setInterval(this.props.getSubscribers, 1000 * 60);
        //this.interval = setInterval(this.props.getSubscribers, 1000);
    }

    render() {
        return (
            <Fragment>
                <div style={{ width: "90vw", height: "50vh" }}>
                    <MapWrapped
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBX4PG98L-y5TlMy4Jk6cd59CpKcW8_6S8&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                        subscribers={this.props.subscribers}
                    />
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    subscribers: state.subscribers.subscribers
});
export default connect(mapStateToProps, { getSubscribers })(Maps);
