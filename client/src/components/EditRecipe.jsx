import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

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
    buttonDelete: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 15px',
    margin: '0 5px',
    borderRadius: '5px',
    cursor: 'pointer',
    },
};

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
        axios.get(`http://localhost:3000/api/v1/recipe/${id}`, { withCredentials: true })
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

            axios.post('http://localhost:3000/api/v1/recipe/temp/upload', formData, { withCredentials: true })
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
            const response = await axios.patch(`http://localhost:3000/api/v1/recipe/${id}`, recipe, { withCredentials: true })
            console.log('Recipe updated:', response.data)
            navigate('/displayAll')
        } catch (error) {
            console.error('Error updating recipe:', error)
            setError(error.response.data.error.errors)
        }
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/v1/recipe/${id}`, { withCredentials: true })
        .then(res => {
            setAllRecipes(allRecipes.filter(recipe => recipe._id !== id))
            navigate("/displayAll")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={formStyles.container}>
            <h1>Edit Your Recipe</h1>
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
                                onChange={(e) => handleIngredientChange(ingredient._id, e.target.value)}
                            />
                            <div style={formStyles.marginAround}>
                            <button style={formStyles.button} type="button" onClick={() => removeIngredient(ingredient._id)}>Remove</button>
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
                                onChange={(e) => handleMethodChange(step._id, e.target.value)}
                            />
                            <div style={formStyles.marginAround}>
                            <button style={formStyles.button} type="button" onClick={() => removeMethodStep(step._id)}>Remove Step</button>
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
                <div style={formStyles.marginAround}>
                <button onClick={() => {handleDelete(recipe._id); navigate("/displayAll");}}  style={formStyles.buttonDelete}>Delete</button>
                </div>
                <button style={formStyles.button} type="submit">Update Recipe</button>
            </form>
        </div>
    )
}

export default EditRecipe;
