import './App.css'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import DisplayAll from './components/DisplayAll' 
import CreateRecipe from './components/CreateRecipe'
import EditRecipe from './components/EditRecipe'
import ViewRecipe from './components/ViewRecipe'
import Register from './components/Register'
import Login from './components/Login'
import Nav from './components/Nav'

function App() {
  return (
    <BrowserRouter>
      <RoutesWithNav />
    </BrowserRouter>
  );
}
// The RoutesWithNav component conditionally renders the Nav component based on the current path. The Nav component is not rendered on the 'home' or 'login' page.
function RoutesWithNav() {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname !== '/' && location.pathname !== '/login' && <Nav />}
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/displayAll" element={<DisplayAll />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} />
        <Route path="/viewRecipe/:id" element={<ViewRecipe />} />
      </Routes>
    </div>
  );
}

export default App