import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";

import "./crossbutton.css";

/**
 * @description Cross button renders X if the props.value is not null
 */
const CrossButton = props => {
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

CrossButton.defaultProps = {
  value: "default"
};

CrossButton.propTypes = {
  value: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired
};

export default CrossButton;
