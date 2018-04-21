const db = require('../config/connection');

function getAllDefaultRecipes() {
    return db.any('SELECT * FROM default_recipes');
}

function getOneDefaultRecipe(id) {
    return db.any('SELECT default_recipes.recipe_name, default_recipes.description, default_recipes.instructions, default_recipes.nutrition, default_recipes.image_url, default_ingredients.ingredient_name FROM default_recipes JOIN default_ingredients ON default_recipes.recipe_id = default_ingredients.recipe_id WHERE default_recipes.recipe_id = $1', id);
}

function getAllUserRecipes() {
    return db.any('SELECT * FROM user_recipes');
}

function getOneUserRecipe(id) {
    return db.any('SELECT user_recipes.recipe_id, user_recipes.recipe_name, user_recipes.description, user_recipes.instructions, user_recipes.nutrition, user_recipes.image_url, user_ingredients.ingredient_name FROM user_recipes JOIN user_ingredients ON user_recipes.recipe_id = user_ingredients.recipe_id WHERE user_recipes.recipe_id = $1', id);
}

function createRecipe(recipe) {

    return db.one(`INSERT INTO user_recipes (recipe_id, recipe_name, description, instructions, nutrition, image_url) VALUES($/recipe_id/, $/recipe_name/, $/description/, $/instructions/, $/nutrition/, $/image_url/) RETURNING *`, recipe);

}

function createIngredient(ingredient) {

    return db.one(`INSERT INTO user_ingredients (ingredient_name, recipe_id) VALUES($/ingredient_name/, $/recipe_id/) RETURNING *`, ingredient);

}

module.exports = {
    getAllDefaultRecipes,
    getOneDefaultRecipe,
    getAllUserRecipes,
    getOneUserRecipe,
    createRecipe,
    createIngredient
}