const recipes = require('../models/recipes');       //import the recipes
const uniqid = require('uniqid');                  //import the uniqid module
const fetch = require = require('node-fetch');     //import the node-fetch module

//define the functions that get values from the model
function getAllDefaultRecipes(req, res, next){
  fetch('https://www.themealdb.com/api/json/v1/1/latest.php')     //fetch the api
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.locals.recipes = data.meals;
            next();
        })
        .catch((err) => {
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
 const id = uniqid();            //assign the uniqid to the id const variable
 let recipeDetails = {};         //create an empty object
 recipeDetails = req.body;       //assign the values gotten from the POST request to recipeDetails
 recipeDetails.recipe_id = id;    //assign the uniqid to recipe_id
    recipes.createRecipe(recipeDetails)     //call the function that inserts values into the user_recipes table
 .then(()=>{
     console.log('recipe details');
     console.log(recipeDetails);
     if (Array.isArray(recipeDetails.ingredients)){
         recipeDetails.ingredients.forEach(ingredient => {   //loop through the value in the ingredients
             console.log(ingredient);
             let ingredientDetails = {};
             ingredientDetails.ingredient_name = ingredient;
             ingredientDetails.recipe_id = id;
             console.log('creating ingredients')
             console.log(ingredientDetails);
             recipes.createIngredient(ingredientDetails)    //call the function that inserts values into the user_ingredients table
                 .then(() => {
                     next();
                 })
                 .catch((err) => {
                     next(err);
                 })
         });
     }
     else{
         let ingredientDetails = {};
         ingredientDetails.ingredient_name = recipeDetails.ingredients;
         ingredientDetails.recipe_id = id;
         console.log('creating ingredients')
         console.log(ingredientDetails);
         recipes.createIngredient(ingredientDetails)    //call the function that inserts values into the user_ingredients table
             .then(() => {
                 next();
             })
             .catch((err) => {
                 next(err);
             })
     }
     

     next();
 })
 .catch((err)=>{
     next(err);
 })
 
}

function updateRecipe(req, res, next) {
    recipes.deleteIngredient(req.body.recipe_id)   //call the function that deletes ingredients from the user_ingredients table
    .then(()=>{
        console.log('delete Ingredient');
        next();
    })
    .catch(err =>{
        next(err);s
    })


    req.body.ingredients.forEach(ingredient => {        //loop through the ingredient values gotten from the post/update request
        console.log(ingredient);
        let ingredientDetails = {};
        ingredientDetails.ingredient_name = ingredient;
        ingredientDetails.recipe_id = req.body.recipe_id;
        recipes.createIngredient(ingredientDetails)         //call the function that inserts values into the user_ingredients table
            .then(() => {
                console.log('add Ingredient');
                next();
            })
            .catch((err) => {
                next(err);
            })
    });

    recipes.updateRecipe(req.body)         //call the function that updates the user_recipes table
    .then(data =>{
        next();
    })
    .catch(err =>{
        next(err);
    })
}

function deleteRecipe(req, res, next) {     
    const recipe_id = req.params.id;
    recipes.deleteIngredient(recipe_id)     //call the function that deletes ingredients from the user_ingredients table
    .then(()=>{
        console.log('ingredients deleted');
        next();
    })
    .catch(err =>{
        next(err);
    })

    recipes.deleteRecipe(recipe_id)         //call the function that deletes recipes from the user_recipes table
        .then(() => {
            console.log('recipe deleted');
            res.redirect('/user_recipes');
            next();
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {        //export the functions
    getAllDefaultRecipes,
    getOneDefaultRecipe,
    getAllUserRecipes,
    getOneUserRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}