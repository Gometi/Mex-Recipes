const recipesRouter = require('express').Router();
const userRecipesRouter = require('express').Router();
const recipesController = require('../controller/recipesController');
const recipesViewController = require('../controller/recipesViewController');
const createRouter = require('express').Router();
recipesRouter.route('/')
    .get(recipesController.getAllDefaultRecipes, recipesViewController.showAllRecipes)

recipesRouter.route('/:id')
    .get(recipesController.getOneDefaultRecipe, recipesViewController.showOneRecipe)

userRecipesRouter.route('/')
    .get(recipesController.getAllUserRecipes, recipesViewController.showAllUserRecipes)


userRecipesRouter.route('/:id/edit')
    .get(recipesController.getOneUserRecipe, recipesViewController.editRecipe)

userRecipesRouter.route('/create')
    .get(recipesViewController.createRecipe)
    .post(recipesController.createRecipe)

userRecipesRouter.route('/:id')
    .get(recipesController.getOneUserRecipe, recipesViewController.showOneUserRecipe)

    

module.exports = {
    recipesRouter,
    userRecipesRouter,
    createRouter
}
