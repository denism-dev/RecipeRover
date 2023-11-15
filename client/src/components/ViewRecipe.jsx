import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ViewRecipe = () => {
const { id } = useParams(); 
const [recipe, setRecipe] = useState(null);

useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/recipe/${id}`)
    .then(res => {
        setRecipe(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, [id])

if (!recipe) {
    return <div>Loading...</div>
}

return (
    <div>
    <h1>Recipe Name: {recipe.title}</h1>
    {recipe.images && (
        <img src={`http://localhost:3000/${recipe.images}`} alt={recipe.title} style={{ maxWidth: '500px' }} />
    )}
    <h2>Ingredients</h2>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
        {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient.name}</li>
        ))}
    </ul>
    <h2>Method</h2>
    {recipe.method.map((step, index) => (
        <div key={index}>
        <h3>Step {step.step_number}</h3>
        <p>{step.step}</p>
        </div>
    ))}
    </div>
)
}

export default ViewRecipe;

