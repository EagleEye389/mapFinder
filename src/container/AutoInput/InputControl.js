import React, {Component} from 'react';
import { GoogleApiWrapper} from 'google-maps-react';
import ButtonControl from '../../components/Button/Button';
import {startLabel,dropLabel,startPlaceholder,dropPlaceholder } from '../../helper/constant';
import Separator from '../../components/Separator/Separator';
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
          this.setState({     to:false,from:false ,submitLabel:'Submit',emptyErrorFrom:"" ,emptyErrorTo:""});        
          this.props.resetMap();
         }
    }

    HandleCrossButton = (box)=>{
          if(box === 'from')          
          { 
            if(this.fromInput.value){
                  this.setState({ from:true,emptyErrorFrom:'' })                
             }
          else{
            this.setState({  from:false  })
             }
          }

          if(box === 'to')
          {
            if(this.toInput.value){
                this.setState({   to:true ,emptyErrorTo:''   })
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
          this.setState({submitLabel:'Re-Submit'})
          this.props.getDirections(from, to);        

      }
      else{

           if(!this.fromInput.value){
              this.setState({
                  emptyErrorFrom:"errorOutline"
              })
           }
           if(!this.toInput.value)
           {
              this.setState({
                  emptyErrorTo:"errorOutline"
              })

           }
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
                               type="text" className={this.state.emptyErrorFrom }ref={el => (this.fromInput = el)} />  
                             </div>
                            <div className="input-text-cross">
                              <ButtonControl label="X" action={()=>{this.clearAutoPlacer('from')}} Isvisible={this.state.from} />
                            </div>
                         </div>
                      </div>
                      <Separator />
                      <div className="input-box">
                        <div className="input-box-label">
                        <label>{dropLabel}</label>
                        </div>
                        
                         <div className="input-box-area">
                             <div className="input-text">                                
                               <input  placeholder={dropPlaceholder} className={this.state.emptyErrorTo} onChange={()=>this.HandleCrossButton('to')}
                                 type="text" ref={el => (this.toInput = el)} />  
                             </div>
                            <div className="input-text-cross">
                              <ButtonControl label="X" action={()=>this.clearAutoPlacer('to')} Isvisible={this.state.to}/>
                            </div>
                         </div>
                        </div>
                        <Separator />

                         <div className="input-box-button">
                         <ButtonControl label={this.state.submitLabel} Isvisible={true}  styler="submit-info" action={this.getRoute} />
                         <ButtonControl label="Reset" Isvisible ={true} styler="reset-info" action={this.clearAutoPlacer}/>                                                       
                        </div>
         
                      </>
                
      )
    }
    
}
export default GoogleApiWrapper({apiKey:process.env.REACT_APP_API_KEY})(InputControl)