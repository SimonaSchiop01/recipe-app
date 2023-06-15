import React, {useContext} from "react";
import styles from "./Recipe.module.css"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom";
import { RecipesContext } from "../../contexts/RecipesContext/Recipes.context";

function Recipe({recipes}){
  const {id,name, photo}=recipes;
  const navigate=useNavigate();
  const {deleteDocument}=useContext(RecipesContext)

  return(
  <div className={styles.recipeWrapper}>
  <div className={styles.recipe}>
  <img className={styles.photo} src={photo}></img>
  <div className={styles.info}>
  <div className={styles.name}>{name}</div>
  
    <Button text="View recipe" fullWidth={true} onClick={()=>{navigate(`/recipe/${id}`)}}></Button>
    <div className={styles.btn}>
    <Button text='Editeaza' onClick={()=>navigate(`/editRecipe/${id}`)}></Button>
    <Button text="Sterge" onClick={()=>deleteDocument(id)}></Button>
    </div>
  </div>
  </div>
</div>
  )
}

export default Recipe;