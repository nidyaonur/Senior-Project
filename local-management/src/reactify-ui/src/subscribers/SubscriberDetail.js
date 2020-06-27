import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SubscriberDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            slug: null,
            subscriber: null,
            doneLoading: false,
        }
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
    console.log("loading")
    fetch(endpoint,lookupOptions)
    .then(function(response){
      return response.json()
    }).then(function(responseData){
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
        return(
            
            <p>{(doneLoading === true) ? <div> {subscriber === null ? "Not Found": 
                
                <div>
                <h1>{subscriber.title}</h1>
                    {subscriber.slug}
                <p className='lead'><Link maintainScrollPosition={false} to={{
                    pathname: `/subscribers`,
                    state: {fromDashboard: false}
                }}> Subscribers</Link></p>
                </div>    
                }
                
                </div> : "Loading" }</p>
        )

    
    }

}
export default SubscriberDetail
