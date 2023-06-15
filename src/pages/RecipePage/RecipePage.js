import React,{useContext, useState} from "react"
import {useParams} from "react-router-dom"
import styles from "./RecipePage.module.css"
import { RecipesContext } from "../../contexts/RecipesContext/Recipes.context";
import QuantityMultiplier from "../../component/QuantityMultiplier/QuantityMultiplier";

export function RecipePage(){
  
  const [q,setQ]=useState(1);
  const {id}=useParams();
  console.log(id);

  const {getRecipeById}=useContext(RecipesContext)
  const recipe=getRecipeById(id) 
  console.log(recipe);
  return(
  <>
    <div className={styles.recipe}>
      <div className={styles.title}>{recipe.name}</div>
      <div className={styles.photo}><img src={recipe.photo}/></div>

      <div className={styles.time}>{recipe.time}</div>
      <div className={styles.ingredientsShow}><ul>{recipe.ingredients.map((i)=><li>{`${i.name} X ${i.quantity*q} `}</li>)}</ul></div>

      <div className={styles.method}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
    <QuantityMultiplier quantity={q} qtyChanged={setQ}></QuantityMultiplier>
  </>
  )
}

