import React , {Component} from 'react';
import PropTypes from 'prop-types';

import InputControl from '../input/InitAutoInput';
import {Loader} from '../../components/Loader/Loader';
import getDirections from '../../helper/apiRequest';
import {normalizedLocation} from '../../helper/utiltiy';

import './selection.css';

/**
 * @type {Component}
 * @name Selection
 * @description View to show input and button to manipulate map.
 */

class Selection extends Component{

    // Initial State
    state = {
           errorMsg:'',
           time:'',
           distance:'',
           isLoading:false
    }

    
    /**
     * @name handleResetHandler
     * @description This method is used to reset the application
     *  state to original one.     
     */
    handleResetHandler=()=>{
        this.setState({
          time:"",
          distance:"",
          errorMsg:""
        })
        this.props.resetMap();
      }

    
    /**
     * @name changeLoader
     * @description This method display to control loader while calling api to fetch data.
     * @param {{isLoading}} Boolean value to control loader state.
     */

    changeLoader = isLoading => {
        this.setState(() => ({
            isLoading
        }));
    };

    
    /**
     * @name displayErrorMessage
     * @description This method display the error message and hide loader.
     * @param {{message}} String Message to be displayed
     */

    displayErrorMessage = (message)=>{ 
          this.setState({errorMsg:message,time:'',distance:''})
     }

    
    /**
     * @name handleSubmission
     * @description This method is calling api to get path , total 
     * distance and total time and same updated in the state to refresh map.
     * In case of any error it will same update in state. 
     * @param {{from}} String Passing origin 
     * @param {{to}} String  Passing destination
     */
    handleSubmission = async(from ,to)=>{
          this.changeLoader(true);

          if(from && to){  
            await getDirections(from,to,2).then((response)=>{
                const {error ,path} = response
                if(error){
                    this.displayErrorMessage(response.error);
                    return;
                }     
                if(path)
                {    
                    let path = normalizedLocation(response.path);
                     this.setState({
                          time : response.total_time,
                          distance: response.total_distance,
                          errorMsg:''
                     });
     
                     this.props.updatePath(path);
                }

            }).catch(e=>{
                this.displayErrorMessage('Internal server error');
            });
            this.changeLoader(false); 
          
        }  
    
    } 

    /**
     * @description Render method of the component
     */
    render(){
        return (
           <>

           <Loader isLoading={this.state.isLoading} />         
            
                
                <div className="row mt-1">
                    <div className="col-xs-12 col-12 col-md-12 col-sm-12 col-lg-12">
                     <InputControl getDirections = {this.handleSubmission} resetMap = { this.handleResetHandler }/>
                    </div>

                </div>
                <div className="row mt-2"> 
                 <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md-offset-1" >
                  {this.state.distance && <div>total distance : {this.state.distance}</div>}
                  {this.state.time && <div>total time : {this.state.time }</div>}
                  <span className="text-danger">{this.state.errorMsg}</span>

                     </div>        
                </div> 
           
        
        </>
        )
    }
}


Selection.propTypes = {
    resetMap: PropTypes.func.isRequired,
    updatePath: PropTypes.func.isRequired,
}

export default Selection;