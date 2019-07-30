import React from 'react';
const buttonControl=({label,handler,styler,actionable})=>{
 return(
    <button className={styler} onClick={()=>handler()}>{label}</button>
 )
}
export default buttonControl;