import React from 'react'

const ButtonControl = ({action,styler,label,Isvisible})=>{
 return (  Isvisible && 
           <button className={styler} onClick={action}>{label}</button>
        )
}

export default ButtonControl;