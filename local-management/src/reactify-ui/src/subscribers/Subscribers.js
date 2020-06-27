import React, { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'
import SubscriberCreate from './SubscriberCreate'
import SubscriberInline from './Subscriberinline'

class Subscribers extends Component {
    constructor(props){
        super(props)
        this.toggleSubscriberListClass = this.toggleSubscriberListClass.bind(this)
        this.handleNewSubscriber= this.handleNewSubscriber.bind(this)  
    
    }
    state = {
        subscribers:[],
        subscribersListClass: "card",

    }
  loadSubscribers(){
    const endpoint = '/api/subscribers/'
      let thisComp = this
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint,lookupOptions)
    .then(function(response){
      return response.json()
    }).then(function(responseData){
      console.log(responseData)
        thisComp.setState({
            subscribers: responseData
        })
    }).catch(function(error){
        console.log(error)
    })
  }

    handleNewSubscriber(subscriberItemData){
        console.log(subscriberItemData)
        let currentSubscribers = this.state.subscribers
        currentSubscribers.push(subscriberItemData)
        this.setState({
            subscribers: currentSubscribers
        })
    
    }







    toggleSubscriberListClass(event){
        event.preventDefault()

        let currentListClass = this.state.subscribersListClass
        console.log(currentListClass)
        
        if (currentListClass === ""){
          this.setState({
            subscribersListClass: "card",
          })  
        } else {
          this.setState({
            subscribersListClass: "",
          })  
                        
        }

    }
  componentDidMount(){
      this.setState({
          subscribers: [],
          subscribersListClass: "card"
      })
    this.loadSubscribers()
  }
  render() {
      const {subscribers} = this.state
      const {subscribersListClass} =this.state
      const csrfToken = cookie.load('csrftoken')
    return (
        <div>
            {(csrfToken !== undefined) && csrfToken !== null ? 
            <div className='my-5'>
                <SubscriberCreate newSubscriberCreated={this.handleNewSubscriber}/>
            </div>
            : ""}
            
            <button onClick={this.toggleSubscriberListClass}> Toggle Class</button>
            {subscribers.length > 0 ? subscribers.map((subscriberItem, index)=>{
            return (
                <SubscriberInline subscriber={subscriberItem} elClass={subscribersListClass} />
                
            )
            }) : <p>No Subscribers Found</p>}
            
        </div>
      );
  }
}

export default Subscribers;
