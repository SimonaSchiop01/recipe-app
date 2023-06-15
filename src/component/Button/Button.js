import React from "react"
import styles from "./Button.module.css"

function Button({text, topBar, fullWidth, onClick, disabled, round, selected}){
  return(
    <button className={`${styles.button} ${disabled&&styles.disabled} ${topBar&&styles.topBar} ${fullWidth&&styles.fullWidth} ${selected&&styles.selected}`} onClick={()=>{if(!disabled) onClick()}}>{text}</button>
  )
}

export default Button;