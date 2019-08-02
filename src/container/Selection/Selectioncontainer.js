import React , {Component} from 'react';
import InputControl from '../input/initAutoInput';
import {Loader} from '../../components/Loader/Loader';
import getDirections from '../../helper/apiRequest';
import {normalizedLocation} from '../../helper/utiltiy';
import PropTypes from 'prop-types';
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
           path : [],
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
          errorMsg:"",
          path:[]
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
          this.changeLoader(false);
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
    handleSubmission=async(from ,to)=>{
          this.changeLoader(true);

          if(from && to){  
            let response =  await getDirections(from,to,2).catch(e=>{
                this.displayErrorMessage('Internal server error');
            });

            this.changeLoader(false);
 
           if(response && response.error){
               this.displayErrorMessage(response.error);
               return;
           }

           if(response && response.path)
           {    
               let path = normalizedLocation(response.path);
                this.setState({
                     path: path,
                     time : response.total_time,
                     distance: response.total_distance,
                     errorMsg:''
                });

                this.props.updatePath(path);
           }
        }  
    
    } 

    /**
     * @description Render method of the component
     */
    render(){
        return (
        <div className="form-area">
            <Loader isLoading={this.state.isLoading} />
            <InputControl getDirections = {this.handleSubmission} resetMap = { this.handleResetHandler }/>
                      
            <div className="input-box-message">
                {this.state.distance && <div>total distance : {this.state.distance}</div>}
                {this.state.time && <div>total time : {this.state.time }</div>}
                <span className="error">{this.state.errorMsg}</span>
             </div>               
        </div>)
    }
}


Selection.propTypes = {
    resetMap: PropTypes.func.isRequired,
    updatePath: PropTypes.func.isRequired,
}

export default Selection;