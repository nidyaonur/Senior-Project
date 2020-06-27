import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'

class SubscriberCreate extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.clearForm = this.clearForm.bind(this) 
        this.subscriberTitleRef = React.createRef() 
    } 
    
  createSubscribers(data){
    const endpoint = '/api/subscribers/'
    const csrfToken =  cookie.load('csrftoken')
    const thisComp = this
    if (csrfToken !== undefined){
      let lookupOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(data),
        credentials: 'include' 
      }
  
      fetch(endpoint,lookupOptions)
      .then(function(response){
        return response.json()
      }).then(function(responseData){
        console.log(responseData)
        if (thisComp.props.newSubscriberCreated){
            thisComp.props.newSubscriberCreated(responseData)
        }
        thisComp.clearForm()
      }).catch(function(error){
        console.log(error)
      })

    }
    
  }
    
    
    state = {// this can also be placed inside constructor
        title: null,
        fullname: null,
    }    
    handleSubmit(event){
        event.preventDefault()
        let data = this.state
        console.log(data)
        this.createSubscribers(data)
    }
    handleInputChange(event){
        event.preventDefault() 
        console.log(event.target.name, event.target.value)
        let key = event.target.name
        let value = event.target.value
        if(key === 'title'){
            if(value.length > 30){
            alert("This title is too long")// we can use it for keeping compatible this forms with our models.py classes
            }
        
        }
        this.setState({
            [key]: value
        })
    }
    clearForm(event){
        if(event){
            event.preventDefault()
        }
        this.subscriberCreateForm.reset()
    }
    componentDidMount(){
        this.setState({
            title: null,
            fullname: null,
        })
        this.subscriberTitleRef.current.focus()
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} ref={(el) => this.subscriberCreateForm = el}>
                <div className='form-group'>
                    <label for='title'>Subscriber title</label>
                    <input type='text' id='title' name='title' ref = {this.subscriberTitleRef} className='form-control' placeholder='Subscriber Title' onChange={this.handleInputChange} required='true'/>
                </div>
                <div className='form-group'>
                    <label for='fullname'>Subscriber Fullname</label>
                    <input type='text' id='fullname' name='fullname' className='form-control' placeholder='Subscriber Fullname' onChange={this.handleInputChange} required='true' />
                </div>
                <button className='btn btn-primary'> Create</button>
                <button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>
            </form>
        
        
        )
    
    }

}


export default SubscriberCreate
