import React from "react";
import PropTypes from "prop-types";

/**
 * @name ButtonControl
 * @type {Component}
 * @description Button control
 * @param {{handleClick ,type,label,isvisible ?, disableCheck}} Object Props to stateless component
 * @returns {JSX}
 */
const ButtonControl = ({ handleClick, type, label, isvisible, disableCheck }) =>
  isvisible && (
    <button className={type} disabled={disableCheck} onClick={handleClick}>
      {label}
    </button>
  );

ButtonControl.defaultProps = {
  isvisible: true
};
// Prop type need to render this component
ButtonControl.propTypes = {
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isvisible: PropTypes.bool,
  disableCheck: PropTypes.bool.isRequired
};

export default ButtonControl;
