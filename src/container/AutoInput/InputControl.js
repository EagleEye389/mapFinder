import React, {Component} from 'react';
import { GoogleApiWrapper} from 'google-maps-react';
import {googleAPIKey } from '../../common/config'
import ButtonControl from '../../components/Button/Button';
import {startLabel,dropLabel,startPlaceholder,dropPlaceholder } from '../../helper/constant';
import './InputControl.css'

class InputControl extends Component{
   fromInput;
   fromAutoComplete;
   toAutoComplete;   
   toInput;
   state= {
     from:false,
     to:false,
     submitLabel:'Submit'
   }
    renderAutoComplete = async () => {
            const maps =  await this.props.google.maps;
            this.fromAutoComplete = new maps.places.Autocomplete(this.fromInput);
            this.toAutoComplete = new maps.places.Autocomplete(this.toInput);
    };
    
    componentDidMount() {
            this.renderAutoComplete();
      }
    clearAutoPlacer = (inputbox)=>{
        if(inputbox === 'from')
         { 
           this.fromInput.value = "";
           this.setState({  from:false  })
         
        }
        else if(inputbox === 'to')
         {  this.toInput.value = "";
           this.setState({     to:false  })

         }

         else{
          this.toInput.value = "";
          this.fromInput.value = "";
          this.setState({     to:false,from:false ,submitLabel:'Submit' });        
          this.props.resetMap();
         }
    }

    HandleCrossButton = (box)=>{
          if(box === 'from')          
          { 
            if(this.fromInput.value){
                  this.setState({ from:true })                
             }
          else{
            this.setState({  from:false  })
             }
          }

          if(box === 'to')
          {
            if(this.toInput.value){
                this.setState({   to:true    })
               }
          else{
            this.setState({     to:false  })
               }
          }
    }

    getRoute = () => {
      if(this.fromInput.value && this.toInput.value)
        {  
          const from = this.fromAutoComplete.getPlace();
          const to = this.toAutoComplete.getPlace();
          this.setState({submitLabel:'Resubmit'})
          this.props.getDirections(from, to);        

      }
      else{
          alert("Enter the input correctly");
      }
  };

    render(){

         return   (<>  <div className="input-box">
                        <div className="input-box-label">
                        <label>{startLabel}</label>
                        </div>
                        
                         <div className="input-box-area">
                             <div className="input-text">    
                              <input  placeholder={startPlaceholder} onChange={()=>this.HandleCrossButton('from')}
                               type="text" ref={el => (this.fromInput = el)} />  
                             </div>
                            <div className="input-text-cross">
                              <ButtonControl label="X" action={()=>{this.clearAutoPlacer('from')}} Isvisible={this.state.from} />
                            </div>
                         </div>
                      </div>
                      <div className="input-box">
                        <div className="input-box-label">
                        <label>{dropLabel}</label>
                        </div>
                        
                         <div className="input-box-area">
                             <div className="input-text">                                
                               <input  placeholder={dropPlaceholder} onChange={()=>this.HandleCrossButton('to')}
                                 type="text" ref={el => (this.toInput = el)} />  
                             </div>
                            <div className="input-text-cross">
                              <ButtonControl label="X" action={()=>this.clearAutoPlacer('to')} Isvisible={this.state.to}/>
                            </div>
                         </div>
                        </div>
                         <div className="input-box-button">
                         <ButtonControl label={this.state.submitLabel} Isvisible={true} action={this.getRoute} />
                         <ButtonControl label="Reset" Isvisible ={true} action={this.clearAutoPlacer}/>                                                       
                        </div>
                                  
                      </>
                
      )
    }
    
}
export default GoogleApiWrapper({apiKey:googleAPIKey})(InputControl)