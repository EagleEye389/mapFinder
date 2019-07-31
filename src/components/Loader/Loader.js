import React from "react";
import "./Loader.css";

function Loader({ isLoading }) {
  return (
    isLoading && (
      <div className="loader-box">
        <div className="loader" />
      </div>
    )
  );
}

export { Loader };
