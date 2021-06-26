const mongoose = require('mongoose');

const userLogin = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
}, {
    timestamps = true
});

const user_login = mongoose.model('user_login' , userLogin);

module.exports = user_login;