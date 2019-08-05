import React from "./node_modules/react";
import Map from "../../components/Map/GoogleMap";
import PropTypes from "./node_modules/prop-types";

import "./map.css";

/**
 * @name MapControl
 * @type {Component}
 * @description Call google map component and pass the path to draw
 * polyline(line) between source and destination as per path coordinate.
 * @param {{path}} Array Props to stateless component
 * @returns {JSX}
 */
const MapControl = ({ path }) => {
  return (
    <div className="map-area">
      <Map path={path} />
    </div>
  );
};

MapControl.propTypes = {
  path: PropTypes.array.isRequired
};

export default MapControl;
