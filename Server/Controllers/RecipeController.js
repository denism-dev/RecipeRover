const Recipe = require('../Models/Recipe');
const { resolve } = require("path");
const fake = require('../Models/RecipeFaker');

// Create recipe
const createRecipe = async (req, res) => {
    try {
        const recipeData = {
            ...req.body, 
            createdBy: req.userId}
        const recipe = new Recipe(recipeData);
        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Search for recipes in the database
const searchRecipe = async (req, res) => {
    try {
        const queryString = req.query.search;
        let recipes;

        if (queryString) {
            const query = {
                $or: [
                    { title: { $regex: queryString, $options: 'i' } },
                    { ingredients: { $regex: queryString, $options: 'i' } },
                    { 'method.step': { $regex: queryString, $options: 'i' } },
                ]
            };

            recipes = await Recipe.find(query);
        } else {
            recipes = await Recipe.find();
        }

        res.json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ createdBy: req.userId});
        res.json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get recipe using ID
const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update recipe using ID
const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updatedData = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedData, {
            new: true,
        });
        if (updatedRecipe) {
            res.json(updatedRecipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete recipe using ID
const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json(deletedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Delete all recipes (For development purposes)
const deleteAllRecipes = async (req, res) => {
    try {
        const deletedRecipes = await Recipe.deleteMany({});
        if (deletedRecipes.deletedCount > 0) {
            res.json({ message: 'All recipes deleted successfully' });
        } else {
            res.status(404).json({ error: "No records to delete..." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Upload the file for recipe images
const validateRecipeImage = async (req, res) => {
    try {
        const recipeImage = req.files.file;

        const imagePath = resolve('dist', 'uploads', recipeImage.name);

        checkDirectory();

        await recipeImage.mv(imagePath);

        res.status(200).send({
            status: "success",
            imagePath: "uploads/" + recipeImage.name
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Check if the upload folder exists and create one if it's not present
const checkDirectory = () => {
    const fs = require('fs');
    const dir = resolve('dist', 'uploads')

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

// Generate fake data for recipes
const fakeRecipeData = async (req, res) => {
    await fake();
    res.send("Done");
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    deleteAllRecipes,
    validateRecipeImage,
    searchRecipe,
    fakeRecipeData
};
