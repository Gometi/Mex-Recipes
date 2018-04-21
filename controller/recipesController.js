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
     next();
 })
 .catch((err)=>{
     next(err);
 })
 
 recipeDetails.ingredients.forEach(ingredient => {
     console.log(ingredient);
     let ingredientDetails = {};
     ingredientDetails.ingredient_name = ingredient;
     ingredientDetails.recipe_id = id;
     recipes.createIngredient(ingredientDetails)
     .then(()=>{
         next();
     })
     .catch((err)=>{
         next(err);
     })
 });
}

module.exports = {
    getAllDefaultRecipes,
    getOneDefaultRecipe,
    getAllUserRecipes,
    getOneUserRecipe,
    createRecipe
}