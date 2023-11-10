import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
return (
    <div>
        <h1>Recipe Rover</h1>
        <Link to={"/"}>My Recipes</Link>
        <Link to={"/createRecipe"}>Create A Recipe</Link>
    </div>
)
}

export default Nav