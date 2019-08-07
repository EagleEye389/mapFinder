import React from "react";
import PropTypes from "prop-types";

import "./clearButton.css";

/**
 * @description Cross button renders X if the props.value is not null
 */
const ClearButton = props => {
  const { value, onChangeInput, name } = props;
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
  value: "default"
};

ClearButton.propTypes = {
  value: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired
};

export default ClearButton;
