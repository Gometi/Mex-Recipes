function showAllRecipes(req, res) {
    res.render('recipes/index');
}

function showOneRecipe(req, res) {
    res.render('recipes/recipeDetails');
}
module.exports = {
    showAllRecipes,
    showOneRecipe
}