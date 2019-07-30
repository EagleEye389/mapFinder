import React,{Component} from 'react';
import './App.css';
import Axiosinstance from './Axios/axiosSetup';
import InputControl from './components/AutoInput/InputControl';
import Info from './components/Information/Information';
import ButtonControl from './components/button/buttonControl';
import normalizedLocation from './Helper/utiltiy';
import Map from './components/map/googleMap';
import {startLabel ,dropLabel, dropPlaceholder,
  startPlaceholder,timeLabel,distanceLabel} from './Helper/constant'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        source :"",
        destination:"",
        distance:"",
        time:"",
        status:"",
        errorMsg:"",
        path:[],
        toggle:false,
        submitLabel:'Submit',
        valueEmpty:false
    }
  }
  
  // set source
  checkoutSource=(pro)=>{
    this.setState({source:pro.description})
  }
  
  //set destination
  checkoutDestination=(pro)=>{
     this.setState({destination:pro.description})
  }
  
// Reset tiggering and reset the value for next trigger
   resetValue=()=>{
     this.setState({
       valueEmpty:false
     })
   }

// On button reset button reset the data
  handleResetHandler=()=>{
    this.setState({
      destination:"",
      source:"",
      time:"",
      distance:"",
      path:[],
      toggle:!this.state.toggle,
      errorMsg:"",
      status:"",
      valueEmpty:true,
      submitLabel:'Submit'

    })
  }

  // Set the query to mock api
  handleSubmission=()=>{
  
  if(this.state.source && this.state.destination){  
    // get the token
    Axiosinstance.post('/route' ,{
                                  "origin": this.state.source,
                                  "destination": this.state.destination
                                }
    ).then((result)=>{
    let token = result.data.token;
     
    // If token is present the get the path and other data.
     const check =()=>{

     
           Axiosinstance.get(`/route/${token}`).then((ch)=>
                    {
                      console.log(ch.data.status);
                       

                   switch(ch.data.status){
                    case "success" : this.setState({
                          time : ch.data.total_time,
                          status: ch.data.status,
                          path : normalizedLocation(ch.data.path),
                          distance: ch.data.total_distance,
                          errorMsg:"",
                          submitLabel:'Re-Submit'
                      });break;
                      case "failure" : this.setState({
                        errorMsg: ch.data.error,
                        status:ch.data.status
                      });break;
                      case "in progress": 
                          this.setState({
                            errorMsg:"In progress,checking ...",
                            status:ch.data.status
                          });check();break;

                      default:break;
                    }
                     
                        
                      }).catch(err=>{console.log(err);
                        this.setState({
                          errorMsg:err.message,
                          status:"failure"
                        })
                      });
                    }
        // call the rescursive function in case "in progress"
         check();

    }).catch((error)=>{
      console.log(error);
      alert("Internal server error , please try again !!")
    })    
  }
  else
  {
    alert("Source or destination is/are missing.")
  }
  }
   
  render(){

    return (
      <div className="app">
       <div className="content">  
         <Info 
           classStyle ='topBarTime' 
           label ={timeLabel}
           value={this.state.time} />
         <Info 
          classStyle ='topBarDistance' 
          label ={distanceLabel} 
          value={this.state.distance} />

            <div className="pathSelectArea">
             <InputControl
              reset={this.resetValue}
              isReset={this.state.valueEmpty}
              label={startLabel}  
              placeholder={startPlaceholder}
              selection={ this.checkoutSource}
              />

            <InputControl
              reset ={this.resetValue}
              isReset ={this.state.valueEmpty}
              label={dropLabel}  
              placeholder={dropPlaceholder }
              selection={ this.checkoutDestination}
              />                     
            
            <br/><br/>
            {this.state.errorMsg && <span className="error">{this.state.errorMsg}</span>}
            <br/>
           < ButtonControl styler="button" label={this.state.submitLabel} handler={this.handleSubmission} />
           < ButtonControl styler="button" label="Reset" handler={this.handleResetHandler} />
           <br/>
           
          </div>
          <div className="mapArea">
           <Map 
            toggle={this.state.toggle}
             path={this.state.path} 
             />
          </div>
      </div>
       </div>   

  
    )
}
}

export default App;
