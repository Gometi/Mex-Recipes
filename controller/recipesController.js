const recipes = require('../models/recipes');

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

module.exports = {
    getAllDefaultRecipes,
    getOneDefaultRecipe
}