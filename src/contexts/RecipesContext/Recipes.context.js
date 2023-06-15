import React, {useState, useEffect} from "react"
import {  getFirestore, collection, getDocs, doc, setDoc, addDoc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 
import { initializeApp } from 'firebase/app';


export const RecipesContext=React.createContext({})

export function RecipesContextProvider({children}){

  const [recipes, setRecipes]=useState({})

  const firebaseConfig = {
    apiKey: "AIzaSyB8boHEAEZ3bKlIaAMXqZuBKc3aMaifr-8",
    authDomain: "magazinvirtual-8ddcf.firebaseapp.com",
    projectId: "magazinvirtual-8ddcf",
    storageBucket: "magazinvirtual-8ddcf.appspot.com",
    messagingSenderId: "969709835232",
    appId: "1:969709835232:web:eaddfd3b54c26ce707d185"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const recipesCol=collection(db, 'Proiecte/recipeApp/recipes');

  useEffect(()=>{
  //  ( async function(){
  //     // const recipesSnap=await getDocs(recipesCol);
  //     // const recipes=(await getDocs(recipesCol)).docs.map(doc => doc.data());
  //     const recipes=(await getDocs(recipesCol)).docs.map(doc => ({id:doc.id, ...doc.data()}));
  //     console.log(recipes) // vector de obiecte
  //     const recipesObj=recipes.reduce((acc,v)=>({...acc,[v.id]:v}),{})
  //     console.log(recipesObj) // obiect care contine ca si chei id-urile si ca valori obiectele
  //     setRecipes(recipesObj)
  //   })()

    ( function(){
      onSnapshot(
        collection(db, 'Proiecte/recipeApp/recipes'), 
        (snapshot) => {
          const recipes=snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}));
          const recipesObj=recipes.reduce((acc,v)=>({...acc,[v.id]:v}),{})
          setRecipes(recipesObj)
        }  )   })()
    
  },[])


//   Promise.all(Object.values({
//     a:{
//     id:"a",
//     name:"Prajitura de casa cu ciocolata, vanilie si rom",
//     time:"45",
//     ingredients:["oua", "zahar", "cacao", "vanilie", "rom"],
//     category:"deserturi",
//     type:"nonvegane"
//    },
//    b:{
//     id:"b",
//     name:"Supa de pui",
//     time:"30",
//     ingredients:["oua", "apa", "sare"],
//     category:"supe",
//     type:"nonvegane"
//    },
//    c:{
//     id:"c",
//     name:"Ciorba de burta",
//     time:"30",
//     ingredients:["oua", "apa", "sare"],
//     category:"ciorbe",
//     type:"nonvegane"
//    },
//   }).map(p=>{setDoc(doc(db,`Proiecte/recipeApp/recipes/${p.id}`),p);
// }))



  const recipesCtxValue={
    getAllRecipes:()=>Object.values(recipes),
    getRecipeById:(id)=>recipes[id],
    addRecipe:(info)=>{
      addDoc(collection(db, 'Proiecte/recipeApp/recipes'), {
          photo:info.photo,
          name:info.name,
          time:info.time,
          ingredients:info.ingredients,
          category:info.category,
          type:info.type,
          method:info.method
      });
      // setRecipes({
      //   ...recipes,
      //   [info.name]:{
      //     id:info.name,
      //     photo:info.photo,
      //     name:info.name,
      //     time:info.time,
      //     ingredients:info.ingredients,
      //     category:info.category,
      //     type:info.type
      //   }
      // })
    },
    editRecipe:(info,id)=>{
      setDoc(doc(db, 'Proiecte/recipeApp/recipes', id), 
      { photo:info.photo,
        name:info.name,
        time:info.time,
        ingredients:info.ingredients,
        category:info.category,
        type:info.type }, { merge: true });},

    deleteDocument:(id)=>{
      deleteDoc(doc(db, `Proiecte/recipeApp/recipes`,id));

    }
  }
  

  return(
    <>
    <RecipesContext.Provider value={recipesCtxValue}>{children}</RecipesContext.Provider>
    </>
  )
}