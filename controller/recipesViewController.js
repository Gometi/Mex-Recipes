//define the functions that shows the ejs files

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

function redirectToUserRecipes(req, res){
    res.redirect(`/user_recipes/${res.locals.user_id}/user`);
}

function editRecipe(req, res) {
    res.render('recipes/editRecipe');
}

function redirectToHome(req, res) {
    console.log('statusCode', res.statusCode)
    if(res.statusCode === 200){
        res.redirect('/recipes');
    }
    else{
        res.redirect('/sign_in');
    }
   
}


module.exports = {        //export the functions
    showAllRecipes,
    showOneRecipe,
    showAllUserRecipes,
    showOneUserRecipe,
    createRecipe,
    redirectToUserRecipes,
    editRecipe,
    redirectToHome
}