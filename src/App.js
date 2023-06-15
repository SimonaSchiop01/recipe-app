import './App.css';
import {useEffect} from "react"
import {Routes, Route} from "react-router-dom";
import RecipesPage from './pages/RecipesPage/RecipesPage';
import CreateRecipePage from "./pages/CreateRecipePage/CreateRecipePage"
import { RecipePage } from './pages/RecipePage/RecipePage';
import Header from "./component/Header/Header"
import { RecipesContextProvider } from './contexts/RecipesContext/Recipes.context';
import EditRecipePage from './pages/EditRecipePage/EditRecipePage';



function App() {

  
 

  return (
    <>
    <RecipesContextProvider>
    <Header></Header>
    <div className='latime'>
      <Routes>
        <Route path="/recipes" element={<RecipesPage></RecipesPage>}></Route>
        <Route path="/createRecipe" element={<CreateRecipePage></CreateRecipePage>}></Route>
        <Route path="/recipe/:id" element={<><RecipePage></RecipePage></>}></Route>
        <Route path="/editRecipe/:id" element={<EditRecipePage></EditRecipePage>}></Route>
      </Routes>
      </div>
      </RecipesContextProvider>
    </>
  );
}

export default App;
