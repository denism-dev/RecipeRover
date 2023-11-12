const faker = require('faker');
const Recipe = require('./Recipe');

// Generate fake records (15 recipes)
async function generateAndSaveRecipes() {
    for (let i = 0; i < 15; i++) {
        const ingredients = [];

        for (let j = 0; j < 5; j++) {
            ingredients.push(`Ingredient ${j + 1}`);
        }

        const method = [];
        for (let k = 1; k <= 3; k++) {
            method.push({
                step_number: k,
                step: faker.lorem.sentence(),
            });
        }

        const recipe = new Recipe({
            title: faker.lorem.words(),
            ingredients: ingredients,
            method: method,
            images: `https://picsum.photos/400/600?image=${faker.random.number({ min: 1, max: 1000 })}`,
        });

        await recipe.save();
    }

    console.log('Recipes created and saved.');
}

module.exports = generateAndSaveRecipes;
