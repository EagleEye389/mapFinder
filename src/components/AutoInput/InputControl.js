import React ,{Component} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

class InputControl extends Component{
   
    constructor(props){
        super(props)
        this.autoplace =  React.createRef();
        }
    
    componentDidUpdate(){
        if(this.props.isReset && this.autoplace.current.state.value)
        {
            this.autoplace.current.state.value=""; 
            this.props.reset();              
          
        }
    }
    
    render(){

         return   (  <><label>{this.props.label}</label>
        <GooglePlacesAutocomplete
           debounce={300}
           placeholder={this.props.placeholder}           
           onSelect={(d)=>{this.props.selection(d)}}
           ref= {this.autoplace}
           
         /></>
      )
    }
    
}
export default InputControl;