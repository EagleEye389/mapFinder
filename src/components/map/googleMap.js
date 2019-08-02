import React from 'react';
import { Map, GoogleApiWrapper,Marker ,Polyline} from 'google-maps-react';
import PropTypes from 'prop-types';


/**
 * @name Mapping
 * @type {Component}
 * @description Map component to display google map and path
 * @param {{path,google}} Object Props to stateless component
 * @returns {JSX}
 */

const Mapping =({path,google}) =>{
return (

   <Map
          google={google}
          zoom={12}
          style={{width:'100%' ,height:'100%'}}
          center={path ? path[0] :{}}
          
        >
           { path && path.length >0  &&    <Marker position={path[0]} /> }
           {path && path.length >0  &&    <Marker position={path[path.length-1]} strokeColor="blue" /> 
       
            }
            
              {path && path.length &&     
               <Polyline
                    path={path}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={5} />  
               }
            </Map>
        )

}

// Prop required to render this control
Mapping.propTypes ={
  path : PropTypes.array.isRequired
}

export default GoogleApiWrapper({apiKey:process.env.REACT_APP_API_KEY})(Mapping);