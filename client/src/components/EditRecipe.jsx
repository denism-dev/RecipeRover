import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditRecipe = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        method: [],
        images: null,
    });

    const [error, setError] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/recipe/${id}`)
            .then(res => {
                if (res.data) {
                    setRecipe(res.data)
                } else {
                    console.error("Unexpected response structure:", res.data)
                }
            })
            .catch(err => console.log(err))
    }, [id])

    const handleTitleChange = (e) => {
        setRecipe({ ...recipe, title: e.target.value })
    }

    const handleIngredientChange = (ingredientId, value) => {
        const newIngredients = recipe.ingredients.map(ingredient =>
            ingredient._id === ingredientId ? { ...ingredient, name: value } : ingredient
        )
        setRecipe({ ...recipe, ingredients: newIngredients })
    }

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { _id: '', name: '' }] })
    }

    const removeIngredient = (ingredientId) => {
        const newIngredients = recipe.ingredients.filter(ingredient => ingredient._id !== ingredientId)
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
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            axios.post('http://localhost:3000/api/v1/recipe/temp/upload', formData)
                .then(response => {
                    setRecipe({ ...recipe, images: response.data.imagePath })
                })
                .catch(error => {
                    console.error('Error uploading image:', error)
                });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/recipe/${id}`, recipe)
            console.log('Recipe updated:', response.data)
            navigate('/')
        } catch (error) {
            console.error('Error updating recipe:', error)
            setError(error.response.data.error.errors)
        }
    }

    return (
        <div>
            <h1>Edit Your Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={recipe.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Ingredients:</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
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
                    {recipe.method.map((step, index) => (
                        <div key={index}>
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
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    )
}

export default EditRecipe;
