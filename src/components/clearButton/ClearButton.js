import React from "react";
import PropTypes from "prop-types";

import "./clearButton.css";

/**
 * @description Cross button renders X if the props.value is not null
 */
const ClearButton = ({ value, onChangeInput, name }) => {
  return (
    <div
      className={`input-group-addon ${value && "visible"} `}
      onClick={() => onChangeInput("", name)}
    >
      X
    </div>
  );
};

ClearButton.defaultProps = {
  value: false
};

ClearButton.propTypes = {
  value: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired
};

export default ClearButton;
