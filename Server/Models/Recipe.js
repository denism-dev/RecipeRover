const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    method: {
        type: [{
            step_number: {
                type: Number,
                required: true
            },
            step: {
                type: String,
                required: true
            }
        }],
        validate: [arrayMinLength, 'A recipe must have at least one method.']
    },
    images: {
        type: String,
        required: false
    },
})

function arrayMinLength(arr) {
    return arr && arr.length > 0;
}

module.exports = mongoose.model('Recipe', RecipeSchema)
