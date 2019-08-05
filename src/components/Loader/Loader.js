import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";

import "./Loader.css";

/**
 * @name Loader
 * @type {Component}
 * @description Show a loader on screen during api calls or async operations.
 * @param {{isLoading}} Object Props to stateless component
 * @returns {JSX}
 */

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loader-box">
        <div className="loader" />
      </div>
    )
  );
};

// Prop type need to render this component
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export { Loader };
