import React,{useState} from "react"
import styles from "./MyTextArea.module.css"

function MyTextArea({label, required, value, onChange=()=>{}, onValidChanged=()=>{}}){

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

  return (
    <div className={styles.MyTextArea}>
      <div>{label}{required&&<span className={styles.req}>*</span>}</div>
      <textarea rows={5} onChange={(e)=>onInputChange(e)}>{value}</textarea>
    </div>
  )
}

export default MyTextArea;