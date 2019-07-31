import React , {Component} from 'react';

import InputControl from '../AutoInput/InputControl';
import Info from '../../components/Information/Information';
import {Loader} from '../../components/Loader/Loader';

import getDirections from '../../helper/apiRequest';
import {normalizedLocation} from '../../helper/utiltiy';
import './Selection.css';

class Selection extends Component{

    state = {
           errorMsg:'',
           time:'',
           distance:'',
           path : [],
           isLoading:false
    }

    handleResetHandler=()=>{
        this.setState({
          time:"",
          distance:"",
          errorMsg:"",
          path:[]
        })
        this.props.resetMap();
      }

      changeLoader = isLoading => {
        this.setState(() => ({
            isLoading
        }));
    };

    displayErrorMessage = (msg)=>{ 
          this.changeLoader(false);
          this.setState({errorMsg:msg,time:'',distance:''})
     }

      handleSubmission=async(from ,to)=>{
          this.changeLoader(true);

          if(from && to){  
            let response =  await getDirections(from,to).catch(e=>{
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
    render(){
        return (
        <div className="form-area">
            <Loader isLoading={this.state.isLoading} />
            <InputControl getDirections = {this.handleSubmission} resetMap = { this.handleResetHandler }/>              
            <div className="input-box-message">
                {this.state.distance && <Info label="total distance" value ={this.state.distance}/>}
                {this.state.time && <Info label="total time" value ={this.state.time}/>}
                <span className="error">{this.state.errorMsg}</span>
             </div>               
        </div>)
    }
}
export default Selection;