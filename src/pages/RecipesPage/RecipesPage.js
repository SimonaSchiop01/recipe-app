import React, {useContext, useState} from "react"
import Recipe from "../../component/Recipe/Recipe"
import styles from "./RecipesPage.module.css"
import { RecipesContext } from "../../contexts/RecipesContext/Recipes.context"
import Filters from "../../component/Filters/Filters"

function RecipesPage(){
const [currentTypeFilter,setCurrentTypeFilter]=useState("toate")
const [currentCategoryFilter,setCurrentCategoryFilter]=useState("toate")

const {getAllRecipes}=useContext(RecipesContext)
const recipes=getAllRecipes();

const recipesFilters=recipes.filter((recipe)=>{
    if(
      (currentTypeFilter=="toate"||recipe.type == currentTypeFilter) && 
      (currentCategoryFilter=="toate" || recipe.category == currentCategoryFilter)
    ){
      return true
    }

  }
)

  return(
    <>
    <Filters name="Tip" options={['toate', 'vegane']} changeFilter={(f)=>setCurrentTypeFilter(f)}></Filters>
    <Filters name="Categorie" options={["toate","supe","ciorbe","deserturi"]} changeFilter={setCurrentCategoryFilter}></Filters>

    <div className={styles.recipesList}>
        {recipesFilters.map((r)=>  <Recipe key={r.id} recipes={r}></Recipe>     )}

       </div>
    </>
  )
}

export default RecipesPage
