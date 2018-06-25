//define the functions that shows the ejs files
const signIn = (req, res)=>{
    res.render('register_sign_in/sign_in');
}

const register = (req, res)=>{
    res.render('register_sign_in/register');
}


module.exports = {
    signIn,
    register
}