import React, {Component} from 'react';
import ButtonControl from '../../components/Button/Button';
import {START_LABEL,START_PLACEHOLDER,DROP_LABEL,DROP_PLACEHOLDER} from '../../helper/constant';
import PropTypes from 'prop-types';
import './inputControl.css'

/**
 * @name InputControl
 * @type {Component}
 * @description This component provide autocomplete input and button to manage the map.
 */
class InputControl extends Component{
  
  // starting point input reference is saved here.
   fromInput;
   //drop off input reference is saved here.
   toInput;

   // starting point is saved when google autocomplete query is done.
   fromAutoComplete;

   // drop off point is saved when google autocomplete query is done.  
   toAutoComplete;   

   // Initial State
   state= {
     from:false,
     to:false,
     submitLabel:'Submit'
   }
   
   /**
     * @name renderInputAutoComplete
     * @description Attach the google places autocomplete to the inputs
   */
    renderInputAutoComplete = async () => {
            const maps =  await this.props.google.maps;
            this.fromAutoComplete = new maps.places.Autocomplete(this.fromInput);
            this.toAutoComplete = new maps.places.Autocomplete(this.toInput);
    };
    

    /**
     * Component lifecycle hook
     */

    componentDidMount() {
            this.renderInputAutoComplete();
      }

/**
 * @name clearInputAutoPlacer
 * @description It will clear the autocomplete input box and reset the map.
 * @param {{inputbox }} String an optional string to detect box or map reset click
 */
    clearInputAutoPlacer = (inputbox)=>{
      // If startpoint cross button is clicked then clear the value and state.
        if(inputbox === 'from')
         { 
           this.fromInput.value = "";
           this.setState({  from:false  })
         
        }
        // If drop off cross button is clicked then clear the value and state.
        else if(inputbox === 'to')
         {  this.toInput.value = "";
           this.setState({     to:false  })

         }
     // If reset is clicked then clear the value and state and reset map.
         else{
          this.toInput.value = "";
          this.fromInput.value = "";
          this.setState({     to:false,from:false ,submitLabel:'Submit',emptyErrorFrom:"" ,emptyErrorTo:""});        
          this.props.resetMap();
         }
    }

  /**
 * @name handleCrossButton
 * @description It will control the visibility of cross button besides the input box.
 * @param {{box}} String  to detect whose cross button is clicked.
 */
    handleCrossButton = (box)=>{
      /*If  start point input box has value then show the cross button else hide the 
      cross button.*/
          if(box === 'from')          
          { 

            if(this.fromInput.value){
                  this.setState({ from:true,emptyErrorFrom:'' })                
             }
          else{
            this.setState({  from:false  })
             }
          }
      /* If  drop off point input box has value then show the cross button else hide the 
       cross button. */
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


    
  /**
 * @name getRoute
 * @description Call api to fetch the direction if both starting and drop off point 
 * is mentioned or has value else it will red outline the corresponding input for missing
 * value
 */
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
                  emptyErrorFrom:"errorOutline",
                  
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
                        <label>{START_LABEL}</label>
                        </div>
                        
                         <div className="input-box-area">
                             <div className="input-text">    
                              <input  placeholder={START_PLACEHOLDER} onChange={()=>{ this.handleCrossButton('from')}}
                               type="text" className={this.state.emptyErrorFrom } ref={el => (this.fromInput = el)} />  
                             </div>
                            <div className="input-text-cross">
                              <ButtonControl label="X" handleClick={()=>{this.clearInputAutoPlacer('from')}} isvisible={this.state.from} />
                            </div>
                         </div>
                      </div>
                      <div className="input-box">
                        <div className="input-box-label">
                        <label>{DROP_LABEL}</label>
                        </div>
                        
                         <div className="input-box-area">
                             <div className="input-text">                                
                               <input  placeholder={DROP_PLACEHOLDER} className={this.state.emptyErrorTo} onChange={()=>this.handleCrossButton('to')}
                                 type="text" ref={el => (this.toInput = el)} />  
                             </div>
                            <div className="input-text-cross">
                              <ButtonControl label="X" handleClick={()=>this.clearInputAutoPlacer('to')} isvisible={this.state.to}/>
                            </div>
                         </div>
                        </div>

                         <div className="input-box-button">
                         <ButtonControl label={this.state.submitLabel}   styler="submit-info" handleClick={this.getRoute} />
                         <ButtonControl label="Reset" styler="reset-info" handleClick={this.clearInputAutoPlacer}/>                                                       
                        </div>
         
                      </>
                
      )
    }
    
}


    // Props need to pass to render this control.
    InputControl.propTypes = {
      google: PropTypes.object.isRequired,
      resetMap: PropTypes.func.isRequired,
      getDirections: PropTypes.func.isRequired,
    }

export default InputControl