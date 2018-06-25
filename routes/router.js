const recipesRouter = require('express').Router();     // import express and create router
const userRecipesRouter = require('express').Router();   // import express and create router
const register_sign_in_Router = require('express').Router();    // import express and create router
const authRouter = require('express').Router();
const recipesController = require('../controller/recipesController');    //import the recipesController
const recipesViewController = require('../controller/recipesViewController');     //import the recipesViewController
const register_sign_in_viewController = require('../controller/register_sign_in_viewController'); //import the register_sign_in_viewController
const authController = require('../controller/authController');

recipesRouter.route('/')                                        //set the route and the functions that will be called on that route
    .get(recipesController.getAllDefaultRecipes, recipesViewController.showAllRecipes)


userRecipesRouter.route('/')                                                                   //set the route and the functions that will be called on that route
    // .get(recipesController.getAllUserRecipes, recipesViewController.showAllUserRecipes)
    .post(recipesController.createRecipe, recipesViewController.redirectToUserRecipes)

userRecipesRouter.route('/:id/user')                                                                   //set the route and the functions that will be called on that route
    .get(recipesController.getAllUserRecipes, recipesViewController.showAllUserRecipes)



userRecipesRouter.route('/:id/edit')                                                           //set the route and the functions that will be called on that route
    .get(recipesController.getOneUserRecipe, recipesViewController.editRecipe)
    
userRecipesRouter.route('/create')                                                             //set the route and the functions that will be called on that route
    .get(recipesViewController.createRecipe)
    

userRecipesRouter.route('/:id')                                                                //set the route and the functions that will be called on that route
    .get(recipesController.getOneUserRecipe, recipesViewController.showOneUserRecipe)
    .put(recipesController.updateRecipe, recipesViewController.redirectToUserRecipes)
    .delete(recipesController.deleteRecipe, recipesViewController.redirectHome)

    
register_sign_in_Router.route('/')
.get(register_sign_in_viewController.signIn)

register_sign_in_Router.route('/register')
    .get(register_sign_in_viewController.register)

    authRouter.route('/register')
    .post(authController.register)

authRouter.route('/sign_in')
    .post(authController.sign_in)

module.exports = {               //export the router
    recipesRouter,
    userRecipesRouter,
    register_sign_in_Router,
    authRouter
}

