import React from 'react'

const ButtonControl = ({action,style,label,Isvisible})=>{
 return (  Isvisible && 
           <button className={style} onClick={action}>{label}</button>
        )
}

export default ButtonControl;