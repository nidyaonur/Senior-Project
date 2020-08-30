import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import SubscribeUpdate from './SubscriberUpdate.js'
class SubscriberDetail extends Component {
    constructor(props){
        super(props)
        this.handleSubscriberUpdated= this.handleSubscriberUpdated.bind(this)
        this.state = {
            slug: null,
            subscriber: null,
            doneLoading: false,
        }
    }
    handleSubscriberUpdated(subscriberData){
        this.setState({
            subscriber: subscriberData

        })

    }
    loadSubscriber(slug){
        const endpoint = `/api/subscribers/${slug}/`
        let thisComp = this
        let lookupOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const csrfToken = cookie.load('csrftoken')
        if(csrfToken !== undefined){
            lookupOptions['credentials'] = 'include'
            lookupOptions['headers']['X-CSRFToken'] = csrfToken
        }
    
        fetch(endpoint,lookupOptions)
        .then(function(response){
            return response.json()
        })
        .then(function(responseData){
        console.log(responseData)
        if(responseData.detail){
        
            thisComp.setState({
            subscriber: null,
            doneLoading: true
            
            })
        }else{
            thisComp.setState({
            subscriber: responseData,
            doneLoading: true
            
            })
                    
        
        }
        }).catch(function(error){
            console.log(error)
        })
    }

    componentDidMount(){
        
        this.setState({
            slug: null,
            subscriber: null
        })
        if (this.props.match){
            const {slug} = this.props.match.params
            this.setState({
                slug: slug,
                doneLoading: false
            
            })

            this.loadSubscriber(slug)
       } 
    
    }

    render(){
        const {slug} = this.state
        const {doneLoading} = this.state
        const {subscriber} = this.state
        console.log(this.state)
        console.log("rendering")
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 5
                }}
            />
        );
        return(
            
            <p>{(doneLoading === true) ? <div> {subscriber === null ? "Not Found": 
                
                <div>
                    <br></br>
                    <h5>Name: {subscriber.fullname}</h5>
                    <h5>Username: {subscriber.user.username}</h5>
                    <ColoredLine color="red" />
                    {subscriber.owner === true ? <SubscribeUpdate subscriber={subscriber} subscriberUpdated={this.handleSubscriberUpdated } /> : "" }
                    <br></br>
                    <p className='lead'><Link maintainScrollPosition={false} to={{
                        pathname: `/subscribers`,
                        state: {fromDashboard: false}
                    }}> Back </Link></p>
                </div>    
                }
                
                </div> : "Loading" }</p>
        )

    
    }

}
export default SubscriberDetail
