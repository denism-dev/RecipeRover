import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
    padding: '5px 10px',
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
    marginAround: {
    margin: '5px',
    },
};

const CreateRecipe = () => {
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [{ name: '' }],
        method: [{ step_number: 1, step: '' }],
        images: null,
    })

    const [error, setError] = useState({})

    const handleTitleChange = (e) => {
        setRecipe({ ...recipe, title: e.target.value })
    }

    const handleIngredientChange = (index, value) => {
        const newIngredients = recipe.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, name: value } : ingredient
        )
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { name: '' }] })
    }

    const removeIngredient = (index) => {
        const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe({ ...recipe, ingredients: newIngredients })
    }

    const handleMethodChange = (index, value) => {
        const newMethod = recipe.method.map((item, i) =>
            i === index ? { ...item, step: value } : item
        )
        setRecipe({ ...recipe, method: newMethod })
    }

    const addMethodStep = () => {
        const nextStepNumber = recipe.method.length + 1;
        setRecipe({
            ...recipe,
            method: [...recipe.method, { step_number: nextStepNumber, step: '' }]
        })
    }

    const removeMethodStep = (index) => {
        const newMethod = recipe.method.filter((_, i) => i !== index)
        setRecipe({ ...recipe, method: newMethod })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:3000/api/v1/recipe/temp/upload', formData)
                .then(response => {
                    setRecipe({ ...recipe, images: response.data.imagePath })
                })
                .catch(error => {
                    console.error('Error uploading image:', error)
                })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitRecipe = {
            title: recipe.title,
            ingredients: recipe.ingredients.map(ingredient => ({ name: ingredient.name })),
            method: recipe.method.map(item => ({ step_number: item.step_number, step: item.step })),
            images: recipe.images,
        }

        try {
            const response = await axios.post('http://localhost:3000/api/v1/recipe', submitRecipe)
            console.log('Recipe created:', response.data)
            navigate('/')
        } catch (error) {
            console.error('Error creating recipe:', error)
            setError(error.response.data)
        }
    }

    return (
        <div style={formStyles.container}>
            <h1>Create a Recipe</h1>
            <form style={formStyles.form} onSubmit={handleSubmit}>
                <div style={formStyles.inputGroup}>
                    <label>Title:</label>
                    <input type="text" value={recipe.title} onChange={handleTitleChange} />
                </div>
                <div style={formStyles.inputGroup}>
                    <label>Ingredients:</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                            <div style={formStyles.marginAround}>
                            <button style={formStyles.button} type="button" onClick={() => removeIngredient(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div>
                    <button style={formStyles.button} type="button" onClick={addIngredient}>Add Ingredient</button>
                    </div>
                </div>
                <div style={formStyles.inputGroup}>
                    <label>Method:</label>
                    {recipe.method.map((step, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={step.step}
                                onChange={(e) => handleMethodChange(index, e.target.value)}
                            />
                            <div style={formStyles.marginAround}>
                            <button style={formStyles.button} type="button" onClick={() => removeMethodStep(index)}>Remove Step</button>
                            </div>
                        </div>
                    ))}
                    <div>
                    <button style={formStyles.button} type="button" onClick={addMethodStep}>Add Step</button>
                    </div>
                </div>
                <div style={formStyles.inputGroup}>
                    <label>Image:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button style={formStyles.button} type="submit">Create Recipe</button>
            </form>
        </div>
    )
}

export default CreateRecipe;
