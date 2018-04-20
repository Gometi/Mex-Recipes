const db = require('../config/connection');

function getAllDefaultRecipes() {
    return db.any('SELECT * FROM default_recipes');
}

function getOneDefaultRecipe(id) {
    return db.any('SELECT default_recipes.recipe_name, default_recipes.description, default_recipes.instructions, default_recipes.nutrition, default_recipes.image_url, default_ingredients.ingredient_name FROM default_recipes JOIN default_ingredients ON default_recipes.recipe_id = default_ingredients.recipe_id WHERE default_recipes.recipe_id = $1', id);
}
module.exports = {
    getAllDefaultRecipes,
    getOneDefaultRecipe
}