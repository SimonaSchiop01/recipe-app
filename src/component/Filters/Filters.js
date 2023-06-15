import React, {useState} from "react";
import Button from "../Button/Button";
import styles from "./Filters.module.css"


function Filters({options, changeFilter, name}){
  const [currentFilter,setCurrentFilter]=useState("toate")

  const handleClick=(newFilter)=>{
    setCurrentFilter(newFilter)
    changeFilter(newFilter)
  }

  return(
    <>
      <div className={styles.filters}>
      {currentFilter}
      {name}: {options.map((f=><Button  key={f} text={f} onClick={()=>handleClick(f)} selected={f==currentFilter}></Button>))}
      </div>
    </>
  )
}

export default Filters