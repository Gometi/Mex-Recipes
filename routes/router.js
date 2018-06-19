const recipesRouter = require('express').Router();     // import express and create router
const userRecipesRouter = require('express').Router();   // import express and create router
const recipesController = require('../controller/recipesController');    //import the recipesController
const recipesViewController = require('../controller/recipesViewController');     //import the recipesViewController
recipesRouter.route('/')                                        //set the route and the functions that will be called on that route
    .get(recipesController.getAllDefaultRecipes, recipesViewController.showAllRecipes)

recipesRouter.route('/:id')                                                                   //set the route and the functions that will be called on that route
    .get(recipesController.getOneDefaultRecipe, recipesViewController.showOneRecipe)

userRecipesRouter.route('/')                                                                   //set the route and the functions that will be called on that route
    .get(recipesController.getAllUserRecipes, recipesViewController.showAllUserRecipes)
    .post(recipesController.createRecipe, recipesViewController.redirectToUserRecipes)


userRecipesRouter.route('/:id/edit')                                                           //set the route and the functions that will be called on that route
    .get(recipesController.getOneUserRecipe, recipesViewController.editRecipe)
    
userRecipesRouter.route('/create')                                                             //set the route and the functions that will be called on that route
    .get(recipesViewController.createRecipe)
    

userRecipesRouter.route('/:id')                                                                //set the route and the functions that will be called on that route
    .get(recipesController.getOneUserRecipe, recipesViewController.showOneUserRecipe)
    .post(recipesController.updateRecipe)
    .delete(recipesController.deleteRecipe, recipesViewController.deleteRecipe)

    

module.exports = {               //export the router
    recipesRouter,
    userRecipesRouter,
}

