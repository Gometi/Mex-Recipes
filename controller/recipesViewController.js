function showAllRecipes(req, res) {
    res.render('recipes/defaultRecipes');
}

function showOneRecipe(req, res) {
    res.render('recipes/recipeDetails');
}

function showAllUserRecipes(req, res) {
    res.render('recipes/userRecipes');
}
function showOneUserRecipe(req, res) {
    res.render('recipes/viewUserRecipeDetails');
}

function createRecipe(req, res) {
    res.render('recipes/createRecipe');
}

function editRecipe(req, res) {
    res.render('recipes/editRecipe');
}
module.exports = {
    showAllRecipes,
    showOneRecipe,
    showAllUserRecipes,
    showOneUserRecipe,
    createRecipe,
    editRecipe
}