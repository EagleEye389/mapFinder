import React from "react";
import "./Loader.css";

/**
 * @name Loader
 * @type {Component}
 * @description Loader control use during api calls
 * @param {{isLoading}} Object Props to stateless component
 * @returns {JSX}
 */

const Loader = ({ isLoading }) =>{
  return (
    isLoading && (
      <div className="loader-box">
        <div className="loader" />
      </div>
    )
  );
}

export { Loader };
