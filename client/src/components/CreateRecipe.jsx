import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateRecipe = () => {
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [{ _id: '', name: '' }],
        method: [{ _id: '', step_number: '', step: '' }],
        images: null,
    })

    const [error, setError] = useState({})

    const handleTitleChange = (e) => {
        setRecipe({ ...recipe, title: e.target.value })
    }

    const handleIngredientChange = (ingredientId, value) => {
        const newIngredients = recipe.ingredients.map(ingredient =>
            ingredient._id === ingredientId ? { ...ingredient, name: value } : ingredient
        )
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { _id: '', name: '' }] })
    }

    const removeIngredient = (ingredientId) => {
        const newIngredients = recipe.ingredients.filter(ingredient => ingredient._id !== ingredientId);
        setRecipe({ ...recipe, ingredients: newIngredients })
    }

    const handleMethodChange = (methodId, step) => {
        const newMethod = recipe.method.map(item =>
            item._id === methodId ? { ...item, step: step } : item
        )
        setRecipe({ ...recipe, method: newMethod })
    }

    const addMethodStep = () => {
        setRecipe({ ...recipe, method: [...recipe.method, { _id: '', step_number: recipe.method.length + 1, step: '' }] })
    }

    const removeMethodStep = (methodId) => {
        const newMethod = recipe.method.filter(item => item._id !== methodId)
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

        try {
            const response = await axios.post('http://localhost:3000/api/v1/recipe', recipe)
            console.log('Recipe created:', response.data);
            navigate('/')
        } catch (error) {
            console.error('Error creating recipe:', error)
            setErrors(error.response.data.error.errors)
        }
    }

    return (
        <div>
            <h1>Create a Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={recipe.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Ingredients:</label>
                    {recipe.ingredients.map((ingredient) => (
                        <div key={ingredient._id || ingredient.name}>
                            <input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(ingredient._id, e.target.value)}
                            />
                            <button type="button" onClick={() => removeIngredient(ingredient._id)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <div>
                    <label>Method:</label>
                    {recipe.method.map((step) => (
                        <div key={step._id || step.step}>
                            <input
                                type="text"
                                value={step.step}
                                onChange={(e) => handleMethodChange(step._id, e.target.value)}
                            />
                            <button type="button" onClick={() => removeMethodStep(step._id)}>Remove Step</button>
                        </div>
                    ))}
                    <button type="button" onClick={addMethodStep}>Add Step</button>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    )
}

export default CreateRecipe;

// commit branch and maybe try a pull request to get denis's stuff too, and also finish the routes part on DisplayAll 