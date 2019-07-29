import React,{Component} from 'react';
import './App.css';
import Axiosinstance from './Axios/axiosSetup';
import InputControl from './components/AutoInput/InputControl';
import Info from './components/Information/Information';
import ButtonControl from './components/button/buttonControl';
import normalizedLocation from './Helper/utiltiy';
import Map from './components/map/googleMap';

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
  
  checkoutSource=(pro)=>{
    console.log("checkout being called");
    this.setState({source:pro.description})
  }
  
  checkoutDestination=(pro)=>{
    console.log("checkout being called");
    this.setState({destination:pro.description})
  }
  

   resetValue=()=>{
     this.setState({
       valueEmpty:false
     })
   }

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

  handleSubmission=()=>{

  if(this.state.source && this.state.destination){
  
    
    Axiosinstance.post('/route' ,{
                                  "origin": this.state.source,
                                  "destination": this.state.destination
                                }
    ).then((result)=>{
    let token = result.data.token;
     
    
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

                    check();
    }).catch((error)=>{
      console.log(error);
      alert("Internal server error , please try again !!")
    })

    /*let dummy = [
      {lat:22.372081,lng:114.107877},
      {lat:22.326442,lng:114.167811},
      {lat:22.284419,lng:114.159510}
    ]

    this.setState({
      path :dummy,
      toggle:!this.state.toggle,
      time:"2000",
      distance:'40000',
      
    })*/
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
           label ='Time'
           value={this.state.time} />
         <Info 
          classStyle ='topBarDistance' 
          label ='Distance' 
          value={this.state.distance} />

            <div className="pathSelectArea">
             <InputControl
              reset={this.resetValue}
              isReset={this.state.valueEmpty}
              label="Start Location"  
              placeholder="Enter Start Location"
              selection={ this.checkoutSource}
              />

            <InputControl
              reset ={this.resetValue}
              isReset ={this.state.valueEmpty}
              label="Drop Off Location"  
              placeholder="Enter drop off location"
              selection={ this.checkoutDestination}
              />                     
            
            <br/><br/>
           < ButtonControl label={this.state.submitLabel} handler={this.handleSubmission} />
           < ButtonControl label="Reset" handler={this.handleResetHandler} />
           <br/>
           {this.state.errorMsg && <span className="error">{this.state.errorMsg}</span>}
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
