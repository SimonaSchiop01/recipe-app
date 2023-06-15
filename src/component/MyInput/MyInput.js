import React, {useState} from "react"
import styles from "./MyInput.module.css"

function MyInput({label, required, value, type="text", onChange=()=>{}, onValidChanged=()=>{}}){

  const [isValid, setIsValid]=useState(!required||(required&&value!=""))
  onValidChanged(isValid)

  function onInputChange(e){
    onChange(e.target.value)
    const newIsValid=!required||(required&&e.target.value!="")

    if(newIsValid!=isValid){
      setIsValid(newIsValid)
      onValidChanged(newIsValid)
    }
  }

  return(
    <div className={styles.MyInput}>
      <div>{label}{required&&<span className={styles.req}>*</span>}</div>
      <input type={type} value={value} onChange={(e)=>onInputChange(e)}></input>
    </div>
  )
}

export default MyInput;