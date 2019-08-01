import React from 'react'


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

export default ButtonControl;