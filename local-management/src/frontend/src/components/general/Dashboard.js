import React, { Fragment } from "react";
import Map from "./Map";
import Subscribers from "./Subscribers";
import "./Dashboard.css";
export default function Dashboard() {
    return (
        <Fragment>
            <div>
                <div className="map">
                    <Map />
                </div>
                <div className="subs">
                    <Subscribers />
                </div>
            </div>
        </Fragment>
    );
}
