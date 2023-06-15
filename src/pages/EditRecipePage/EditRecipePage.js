import React, {useState, useContext} from "react"
import MyInput from "../../component/MyInput/MyInput"
import Button from "../../component/Button/Button"
import styles from "./EditRecipePage.module.css"
import MyTextArea from "../../component/MyTextArea/MyTextArea"
import { RecipesContext } from "../../contexts/RecipesContext/Recipes.context"
import {  useNavigate, useParams } from "react-router-dom"

function EditRecipePage(){


const navigate = useNavigate();
const {id}=useParams()
console.log(id)

const {editRecipe}=useContext(RecipesContext)
const {getRecipeById}=useContext(RecipesContext)

const recipe=getRecipeById(id)
console.log(recipe)


const [name,setName]=useState(recipe.name)
const [photo,setPhoto]=useState(recipe.photo)
const [ingredients,setIngredients]=useState(recipe.ingredients)
const [ingredient,setIngredient]=useState("")
const [ingredientQ,setIngredientQ]=useState(0)

const [method,setMethod]=useState(recipe.method)
const [time,setTime]=useState(recipe.time)
const [category,setCategory]=useState(recipe.category)
const [type,setType]=useState(recipe.type)

const [nameValid, setNameValid]=useState(true)
const [photoValid, setPhotoValid]=useState(true)
const [methodValid, setMethodValid]=useState(true)
const [timeValid, setTimeValid]=useState(true)
const [categoryValid, setCategoryValid]=useState(true)
const [typeValid, setTypeValid]=useState(true)

const valid=nameValid && ingredients.length!=0 && methodValid && timeValid

function changePhoto(e){
  const reader = new FileReader();
  reader.onloadend = function() {
    setPhoto(reader.result);
  }
  reader.readAsDataURL(e.target.files[0]);

}


function addIngredient(){
  if(ingredient == "" || ingredientQ==0) return;
  if(ingredients.filter(ing=>ing.name==ingredient).length!=0) return;

  setIngredients([
    ...ingredients,
    {name:ingredient, quantity: ingredientQ}
  ])
  setIngredient("");
  setIngredientQ(0);
}

  return(
    <>
    <div className={styles.createRecipe}>
        <MyInput label="Nume reteta:" required={true}  value={name} onChange={(v)=>setName(v)} onValidChanged={(v)=>setNameValid(v)}></MyInput>
         <div className={styles.category}>
          <div className={styles.titleCategory}>Categorie:</div>
          <select  value={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <option disabled value="_">Alege criteriu</option>
            <option value="supe">Supe</option>
            <option value="ciorbe">Ciorbe</option>
            <option value="deserturi">Deserturi</option>
          </select>
        </div>
        <div className={styles.type}>
          <div className={styles.titleType}>Tip:</div>
          <select value={type} onChange={(e)=>setType(e.target.value)} >
            <option disabled value="_">Alege criteriu</option>
            <option value="vegane">Vegane</option>
            <option value="nonvegane">Nonvegane</option>
          </select>
        </div> 
       
        <div className={styles.photo}><lable>Imagine:</lable><input type="file" multiple={true} label="Imagine:" onChange={changePhoto}></input> </div>
        <div className={styles.ingredients}> 
            <div>Ingredient:</div>
            <input value={ingredient} onChange={(e)=>setIngredient(e.target.value)}></input>
            <div>Cantitate:</div>
            <input value={ingredientQ} onChange={(e)=>{setIngredientQ(e.target.value)}}></input>
         

            <Button text="adauga ingredient" onClick={addIngredient}></Button>
         </div>
        <div className={styles.ingredientsShow}>{ingredients.map((i)=><span>{`${i.name} X ${i.quantity}, `}</span>)}</div>
        <MyTextArea label="Mod de preparare:" required={true}  value={method} onChange={(v)=>setMethod(v)} onValidChanged={(v)=>setMethodValid(v)}/>
        <MyInput label="Timp de preparare:" required={false} value={time} onChange={(v)=>setTime(v)} onValidChanged={(v)=>setTimeValid(v)}></MyInput>
        <Button className={styles.btn} disabled={!valid} text="Editeaza reteta" onClick={()=>{
          editRecipe({name,photo,ingredients,method,time, type, category},id)
          navigate("/recipes")
        }}></Button>
    </div>

    </>
  )
}

export default EditRecipePage