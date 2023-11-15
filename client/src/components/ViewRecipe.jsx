import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const formStyles = {
    container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    },
    form: {
    width: '300px',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    },
    inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    },
    button: {
    alignSelf: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    },
    link: {
    alignSelf: 'center',
    marginTop: '10px',
    },
    errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
    },
};

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
    return <div>Fetching Data...</div>
}

return (
    <div style={formStyles.container}>
    <h1>Recipe Name: {recipe.title}</h1>
    {recipe.images && (
        <img src={`http://localhost:3000/${recipe.images}`} alt={recipe.title} style={{ maxWidth: '500px' }} />
    )}
    <h2>Ingredients</h2>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
        {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>
            <h4>{ingredient.name}</h4>
        </li>
        ))}
    </ul>
    <h2>Method</h2>
    {recipe.method.map((step, index) => (
        <div key={index}>
        <h3>Step {step.step_number}</h3>
        <h4>{step.step}</h4>
        </div>
    ))}
    </div>
)
}

export default ViewRecipe;

