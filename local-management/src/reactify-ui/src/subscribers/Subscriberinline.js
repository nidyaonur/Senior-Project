import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class SubscriberInline extends Component {
  render() {
      const {subscriber} = this.props
      const {elClass} = this.props
      const showContent = elClass === 'card' ? 'd-block' : 'd-none'

      return (
        <div>
            {subscriber !== undefined ? <div className={elClass}>
            <h1>
                Subscriber: {subscriber.title}
            </h1>
            <h1> <Link maintainScrollPosition={false} to={{
                pathname:`/subscribers/${subscriber.slug}`,
                state: {fromDashboard: false}
            }}>{subscriber.title}</Link> </h1>
            <p className={showContent}>
                Fullname: {subscriber.fullname}
            </p>
            </div>
            : ""}
        </div>
      );
  }
}

export default SubscriberInline;
