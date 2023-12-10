const express = require('express');
const router = express.Router();
const recipeController = require('../Controllers/RecipeController');
const authenticate = require('../Middleware/Authenticate'); 


// Router

// Upload files for recipe images
router.post('/temp/upload', recipeController.validateRecipeImage);

// Search route for recipes
router.get('/search', recipeController.searchRecipe);

// Generate fake data for testing recipes
router.get('/fake', recipeController.fakeRecipeData);

// API routes for recipes
router.get('/',authenticate, recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);
router.post('/', authenticate, recipeController.createRecipe);
router.patch('/:id',authenticate, recipeController.updateRecipe);
router.delete('/:id',authenticate, recipeController.deleteRecipe);
router.delete('/', recipeController.deleteAllRecipes);

module.exports = router;
