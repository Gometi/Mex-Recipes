const express = require('express'); //import express module
const logger = require('morgan');   // import morgan module
const PORT = process.env.PORT || 3000;   //set the server port
const path = require('path');
const app = express();             
const router = require('./routes/router');   //define router
const bodyParser = require('body-parser');
const methodOverride = require('method-override');   //import methode Overrride module for overriding the post request
app.use(logger('dev'));
app.set('view engine', 'ejs');                       //set the view engine for viewing ejs files
app.set('views', path.join(__dirname, 'views'));   //set the path for views folder

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // parse urlencoded req bodies (for POST and PUT requests)
app.use(bodyParser.json());                          //parse with json (for POST and PUT)
app.use(methodOverride('_method'));

app.get('/',(req, res)=>{
    res.render('home/index');                //show the home page
})

app.use('/recipes', router.recipesRouter);    //set routers
app.use('/user_recipes', router.userRecipesRouter);



app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})