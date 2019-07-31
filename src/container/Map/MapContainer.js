import React from 'react';
import Map from '../../components/Map/GoogleMap';
import './Map.css';

const MapControl = ({path}) =>{
       return(
        <div className="map-area">
            <Map path={path} />
         </div>
       )

}
export default MapControl