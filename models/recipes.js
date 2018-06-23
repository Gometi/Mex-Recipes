const db = require('../config/connection');  //import the connection
//define the functions that query the database


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
function deleteIngredient(recipe_id) {
    return db.none(`DELETE FROM user_ingredients WHERE recipe_id = $1`, recipe_id);
}

function updateRecipe(recipe) {
    return db.one(`UPDATE user_recipes SET recipe_name = $/recipe_name/, description = $/description/, instructions = $/instructions/, nutrition = $/nutrition/, image_url = $/image_url/ WHERE recipe_id = $/recipe_id/ RETURNING *`, recipe);
}

function deleteRecipe(recipe_id) {
    return db.none(`DELETE FROM user_recipes WHERE recipe_id = $1`, recipe_id);
}

module.exports = {
    getAllUserRecipes,
    getOneUserRecipe,
    createRecipe,
    createIngredient,
    deleteIngredient,
    updateRecipe,
    deleteRecipe
}