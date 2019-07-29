import React from 'react';
const Info =({classStyle ,label , value})=>{

 return(
    value &&
    <div className={classStyle}>
      <span>{label}  :  { value}</span> 
     </div>
 )   
}

export default Info;