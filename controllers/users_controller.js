const User = require('../models/user.js');


//User profile homepage
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile' , {
                    title : "User profile",
                    user : user
                });
            }       
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up' , {
        title: "Sign up"
    });
}


//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in' , {
        title: "Sign in"
    });
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
    //steps to authenticate
    
    //check if the user id is present in db or not
    User.findOne({email : req.body.email} ,function(err,user){
        if(err){console.log("Error - user not found while signing  up"); return;}
        //handle user found
        if(user){
            //check if pwd doesn't matches
            if(user.password!=req.body.password){
                return res.redirect('back');
            }else{
                res.cookie('user_id' , user.id);
                return res.redirect('/users/profile');
            }
            //handle session creation
        }
        //handle user not found
        else{
            return res.redirect('back');
        }
    });
}

//sign out of profile
module.exports.signOut = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err , user){
            if(user){
                res.clearCookie('user_id');
                return res.redirect('/users/sign-in');
            }
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
}