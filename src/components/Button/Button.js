import React from 'react';
import PropTypes from 'prop-types';



/**
 * @name ButtonControl
 * @type {Component}
 * @description Button control
 * @param {{handleClick ,styler,label,isvisible ?}} Object Props to stateless component
 * @returns {JSX}
 */
const ButtonControl = ({handleClick,styler,label,isvisible=true})=>{
 return (  isvisible && 
           <button className={styler} onClick={handleClick}>{label}</button>
        )
}

// Prop type need to render this component
ButtonControl.propTypes ={
        handleClick : PropTypes.func.isRequired,
        styler:PropTypes.string,
        label:PropTypes.string.isRequired,
        isvisible:PropTypes.bool
}

export default ButtonControl;