import React, { Fragment } from "react";
import Form from "./Form";
import Subscribers from "./Subscribers";

export default function SubDashboard() {
    return (
        <Fragment>
            <Form />
            <Subscribers />
        </Fragment>
    );
}
