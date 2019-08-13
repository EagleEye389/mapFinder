import React from "react";
import PropTypes from "prop-types";

import "./loader.css";

/**
 * @name Loader
 * @type {Component}
 * @description Show a loader on screen during api calls or async operations.
 * @param {{isLoading}} Object Props to stateless component
 * @returns {JSX}
 */

const Loader = ({ isLoading }) =>
  isLoading && (
    <div className="loader-box">
      <div className="loader" />
    </div>
  );

// Prop type need to render this component
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

/**
 * @name AppLoader
 * @type {Component}
 * @description Show a loader on screen during google map loading.
 * @returns {JSX}
 */
export const AppLoader = () => (
  <div className="apploading-box">
    <div className="loader" />
  </div>
);

export default Loader;
