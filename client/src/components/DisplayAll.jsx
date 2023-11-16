import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const displayAllStyles = {
    container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    },
    header: {
    textAlign: 'center',
    width: '100%', 
    marginBottom: '20px', 
    },
    card: {
    backgroundColor: '#343a40',
    color: '#ffffff',
    margin: '10px',
    padding: '15px',
    width: '30%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    },
    title: {
    color: '#ffffff',
    fontWeight: 'bold',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    button: {
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        margin: '0 5px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonDelete: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '5px 15px',
        margin: '0 5px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
}

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

return (
    <div style={displayAllStyles.container}>
    <h1 style={displayAllStyles.header}>All Your Delicious Recipes</h1>
    {allRecipes.map((recipe) => (
        <div key={recipe._id} style={displayAllStyles.card}>
        <h2 style={displayAllStyles.title}>{recipe.title}</h2>
        {recipe.images && (
            <img src={`http://localhost:3000/${recipe.images}`} alt={recipe.title} style={{ maxWidth: '200px' }} />
        )}
        <div style={displayAllStyles.buttonGroup}>
            <Link to={`/viewRecipe/${recipe._id}`} style={displayAllStyles.button}>View</Link>
            <Link to={`/editRecipe/${recipe._id}`} style={displayAllStyles.button}>Edit</Link>
            
        </div>
        </div>
    ))}
    </div>
)
}

export default DisplayAll;
