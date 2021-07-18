const User = require('../models/user.js');

module.exports.profile = function(req,res){
    return res.render('user_profile' , {
        title: 'User Profile'
    })
}


//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_up' , {
        title: "Samaaj | Sign up"
    })
}


//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_in' , {
        title: "Samaaj | Sign in"
    })
}

//redirect to sign-in on signing-out
module.exports.destroySession = function(req,res){
    //logout fn is provided by the passport lib
    req.logout();
    return res.redirect('/');
}


//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email} , function(err, user){
        if(err){console.log("Error in finding user in signing up"); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log("Error in creating user while signing up"); return;}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}