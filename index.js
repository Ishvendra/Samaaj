const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//mongo store takes in the argument 'session' as it is going to store the express session
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//set up view engine using ejs
app.set('view engine' , 'ejs');
app.set('views' , './views');


app.use(session({
    name: 'Samaaj',
    //TODO change the secret before depoloyment
    secret: 'blahsomething',
    saveUninitialized: false,   //when the user is not logged in(session isn't created), cookie is not written
    resave: false,  //prevents from getting the cookie saved again and again
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    //mongoStore is used to store the session cookie even if the server is restarted
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || "mongoStore connected");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/' , require('./routes/index.js'));
app.use('/' , require('./routes/users.js'));

app.listen(port , function(err){
    if(err){
        console.log(`${err}: Error in firing up express server on port: ${port}`);
        return;
    }
    console.log(`Express server up & running on port: ${port}`);
});