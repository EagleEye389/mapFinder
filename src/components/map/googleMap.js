import React from 'react';
import {mapkey }from '../../Helper/constant';
import { Map, GoogleApiWrapper,Marker ,Polyline} from 'google-maps-react';
const Mapping =(props) =>{
return (


   <Map
          google={props.google}
          zoom={12}
          style={{width:'100%', height:'100%'}}
          center={props.path ? props.path[0] :''}
          
        >
            { props.path.length >0  &&      <Marker position={props.path[0]} /> }
            { props.path.length >0  &&    <Marker position={props.path[props.path.length-1]} strokeColor="blue" /> 
       
            }
            
    {props.path.length &&     
               <Polyline
                    path={props.path}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={5} />  
    }
            </Map>)

    }


export default GoogleApiWrapper({apiKey:mapkey})(Mapping);