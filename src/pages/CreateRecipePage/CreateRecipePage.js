import React, {useState, useContext} from "react"
import MyInput from "../../component/MyInput/MyInput"
import Button from "../../component/Button/Button"
import styles from "./CreateRecipePage.module.css"
import MyTextArea from "../../component/MyTextArea/MyTextArea"
import { RecipesContext } from "../../contexts/RecipesContext/Recipes.context"
import {  useNavigate } from "react-router-dom"

function CreateRecipePage(){
const [name,setName]=useState("")
const [photo,setPhoto]=useState("")
const [ingredients,setIngredients]=useState([])
const [ingredient,setIngredient]=useState("")
const [ingredientQ,setIngredientQ]=useState(0)

const [method,setMethod]=useState("")
const [time,setTime]=useState("")
const [category,setCategory]=useState("_")
const [type,setType]=useState("")

const [nameValid, setNameValid]=useState(false)
const [photoValid, setPhotoValid]=useState(false)
const [methodValid, setMethodValid]=useState(true)
const [timeValid, setTimeValid]=useState(false)
const [categoryValid, setCategoryValid]=useState(false)
const [typeValid, setTypeValid]=useState(false)

const {addRecipe}=useContext(RecipesContext)
const navigate = useNavigate();


const valid=nameValid && ingredients.length!=0 && methodValid && timeValid

function changePhoto(e){
  // setPhoto(URL.createObjectURL(e.target.files[0]));
  const reader = new FileReader();
  reader.onloadend = function() {
    setPhoto(reader.result);
  }
  reader.readAsDataURL(e.target.files[0]);

}

// function addIngredient(){
//   if(ingredient == "") return;
//   if(ingredients.includes(ingredient)) return;

//   setIngredients([
//     ...ingredients,
//     ingredient
//   ])
//   setIngredient("");
// }

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

function deleteIngredient(i){
  setIngredients(ingredients.filter((el)=>el.name!==i.name))
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
        
        <div className={styles.photo}><lable>Imagine:</lable><input type="file" multiple={false} label="Imagine:" onChange={changePhoto}></input> </div>
        <div className={styles.ingredients}> 
            <div>Ingredient:</div>
            <input value={ingredient} onChange={(e)=>setIngredient(e.target.value)}></input>
            <div>Cantitate:</div>
            <input value={ingredientQ} onChange={(e)=>{setIngredientQ(e.target.value)}}></input>
         

            <Button text="adauga ingredient" onClick={addIngredient}></Button>
         </div>
        
        <div className={styles.ingredientsShow}><ul>{ingredients.map((i)=><li>{`${i.name} X ${i.quantity} `} <Button text="X" onClick={()=>deleteIngredient(i)}></Button></li>)}</ul></div>
        {/* <div className={styles.ingredientsShow}>{ingredients.map((i)=><span>{`${JSON.stringify(i)}, `}</span>)}</div> */}
        <MyTextArea label="Mod de preparare:" required={true}  value={method} onChange={(v)=>setMethod(v)} onValidChanged={(v)=>setMethodValid(v)}/>
        <MyInput label="Timp de preparare:" required={false} value={time} onChange={(v)=>setTime(v)} onValidChanged={(v)=>setTimeValid(v)}></MyInput>
        <Button className={styles.btn} disabled={!valid} text="Adauga reteta" onClick={()=>{
          addRecipe({name,photo,ingredients,method,time, type, category})
          navigate("/recipes")
        }}></Button>
    </div>

    </>
  )
}

export default CreateRecipePage

