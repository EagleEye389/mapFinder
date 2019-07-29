import React from 'react';
const buttonControl=({label,handler})=>{
 return(
    <button onClick={()=>handler()}>{label}</button>
 )
}
export default buttonControl;