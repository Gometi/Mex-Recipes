const recipes = require('../models/recipes');
const uniqid = require('uniqid');
function getAllDefaultRecipes(req, res, next) {
    recipes.getAllDefaultRecipes()
    .then(data =>{
        res.locals.recipes = data;
        next();
    })
    .catch(err =>{
        next(err);
    })
}

function getOneDefaultRecipe(req, res, next) {
    recipes.getOneDefaultRecipe(req.params.id)
    .then(data =>{
        console.log(data);
        res.locals.recipe = data;
        next();
    })
    .catch(err =>{
        next(err);
    })
}

function getAllUserRecipes(req, res, next) {
    recipes.getAllUserRecipes()
        .then(data => {
            res.locals.recipes = data;
            next();
        })
        .catch(err => {
            next(err);
        })
}

function getOneUserRecipe(req, res, next) {
    recipes.getOneUserRecipe(req.params.id)
        .then(data => {
            console.log(data);
            res.locals.recipe = data;
            next();
        })
        .catch(err => {
            next(err);
        })
}

function createRecipe(req, res, next) {
    console.log(req.body);
 const id = uniqid();
 let recipeDetails = {};
 recipeDetails = req.body;
 recipeDetails.recipe_id = id;
    recipes.createRecipe(recipeDetails)
 .then(()=>{
     console.log('recipe details');
     console.log(recipeDetails);
     recipeDetails.ingredients.forEach(ingredient => {
         console.log(ingredient);
         let ingredientDetails = {};
         ingredientDetails.ingredient_name = ingredient;
         ingredientDetails.recipe_id = id;
         console.log('creating ingredients')
         console.log(ingredientDetails);
         recipes.createIngredient(ingredientDetails)
             .then(() => {
                 next();
             })
             .catch((err) => {
                 next(err);
             })
     });

     next();
 })
 .catch((err)=>{
     next(err);
 })
 
}

function updateRecipe(req, res, next) {
    recipes.deleteIngredient(req.body.recipe_id)
    .then(()=>{
        console.log('delete Ingredient');
        next();
    })
    .catch(err =>{
        next(err);s
    })


    req.body.ingredients.forEach(ingredient => {
        console.log(ingredient);
        let ingredientDetails = {};
        ingredientDetails.ingredient_name = ingredient;
        ingredientDetails.recipe_id = req.body.recipe_id;
        recipes.createIngredient(ingredientDetails)
            .then(() => {
                console.log('add Ingredient');
                next();
            })
            .catch((err) => {
                next(err);
            })
    });

    recipes.updateRecipe(req.body)
    .then(data =>{
        next();
    })
    .catch(err =>{
        next(err);
    })
}

function deleteRecipe(req, res, next) {
    const recipe_id = req.params.id;
    recipes.deleteIngredient(recipe_id)
    .then(()=>{
        console.log('ingredients deleted');
        next();
    })
    .catch(err =>{
        next(err);
    })

    recipes.deleteRecipe(recipe_id)
        .then(() => {
            console.log('recipe deleted');
            res.redirect('/user_recipes');
            next();
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    getAllDefaultRecipes,
    getOneDefaultRecipe,
    getAllUserRecipes,
    getOneUserRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}