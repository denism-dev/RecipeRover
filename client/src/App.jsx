import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DisplayAll from './components/DisplayAll' 
import CreateRecipe from './components/CreateRecipe'
import EditRecipe from './components/EditRecipe'
import ViewRecipe from './components/ViewRecipe'
import Nav from './components/Nav'

function App() {

  return (
    <div>
        <BrowserRouter>
        <Nav/>
          <Routes>
            <Route index element = {<DisplayAll/>}/>
            <Route path="/createRecipe" element = {<CreateRecipe/>}/>
            <Route path="/editRecipe/:id" element = {<EditRecipe/>}/>
            <Route path="/viewRecipe/:id" element = {<ViewRecipe/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
