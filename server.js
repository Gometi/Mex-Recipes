const express = require('express');
const logger = require('morgan');
const PORT = 3000;
const path = require('path');
const app = express();
const router = require('./routes/router');
const bodyParser = require('body-parser');
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false })); // parse urlencoded req bodies (for POST and PUT requests)
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.render('home/index');
})

app.use('/recipes', router.recipesRouter);


app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})