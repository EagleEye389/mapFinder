import React from 'react';
import PropTypes from 'prop-types';

import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polyline,
} from 'google-maps-react';


/**
 * @name Mapping
 * @type {Component}
 * @description Map component to display google map and path
 * @param {{path,google}} Object Props to stateless component
 * @returns {JSX}
 */

const Mapping = ({ path, google }) => {
  const mapStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
  };
  return (

    <Map
      google={google}
      zoom={12}
      style={mapStyle}
      center={path ? path[0] : { lat: 20.5937, lng: 78.9629 }}
    >
      {path && path.length && <Marker
        position={path[0]}
        title="Start point"
      /> }
      {path && path.length && <Marker
        position={path[path.length - 1]}
        title="Drop off point"
      />

      }

      { path && path.length &&
      <Polyline
        path={path}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={5}
      />
      }
    </Map>
  )
}

// Prop required to render this control
Mapping.propTypes = {
  path: PropTypes.array.isRequired,
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(Mapping);
