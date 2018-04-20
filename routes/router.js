const recipesRouter  = require('express').Router();
const recipesController = require('../controller/recipesController');
const recipesViewController = require('../controller/recipesViewController');

recipesRouter.route('/')
.get(recipesController.getAllDefaultRecipes, recipesViewController.showAllRecipes)

recipesRouter.route('/:id')
    .get(recipesController.getOneDefaultRecipe, recipesViewController.showOneRecipe)


module.exports = {
    recipesRouter
}

