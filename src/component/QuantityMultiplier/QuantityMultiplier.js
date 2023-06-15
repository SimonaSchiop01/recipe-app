import React, {useState} from "react";
import Button from "../Button/Button";

function QuantityMultiplier({quantity,qtyChanged=()=>{}}){
  const [qty,setQty]=useState(quantity)

function removeQuantity(){
  setQty(qty-1)
  qtyChanged(qty-1)
  console.log(qty)
}

  function addQuantity(){
    setQty(qty+1)
    qtyChanged(qty+1)
    console.log(qty)
  }
  return(
    <div><Button text="-" onClick={removeQuantity}></Button> {qty}<Button text="+" onClick={addQuantity}></Button></div>
  )
}

export default QuantityMultiplier;