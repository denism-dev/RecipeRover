import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DisplayAll = () => {
const [allRecipes, setAllRecipes] = useState([]);

useEffect(() => {
    axios.get('http://localhost:3000/api/v1/recipe')
    .then(res => {
        setAllRecipes(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, [])

const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/recipe/${id}`)
    .then(res => {
        setAllRecipes(allRecipes.filter(recipe => recipe._id !== id))
    })
    .catch(err => {
        console.log(err)
    })
}

return (
    <div>
    <h1>All Your Delicious Recipes</h1>
    {allRecipes.map((recipe) => (
        <div key={recipe._id}>
        <h2>{recipe.title}</h2>
        {recipe.images && (
            <img src={`http://localhost:3000/${recipe.images}`} alt={recipe.title} style={{ maxWidth: '200px' }} />
        )}
        <div>
            <Link to={`/viewRecipe/${recipe._id}`}>View</Link>
        </div>
        <div>
            <Link to={`/editRecipe/${recipe._id}`}>Edit</Link>
        </div>
        <div>
        <button onClick={() => handleDelete(recipe._id)}>Delete</button>
        </div>
        </div>
    ))}
    </div>
)
}

export default DisplayAll;
