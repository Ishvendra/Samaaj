const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use express router
app.use('/' , require('./routes/index.js'));
app.use('/' , require('./routes/users.js'));


//set up view engine using ejs
app.set('view engine' , 'ejs');
app.set('views' , './views');


app.listen(port , function(err){
    if(err){
        console.log(`${err}: Error in firing up express server on port: ${port}`);
        return;
    }
    console.log(`Express server up & running on port: ${port}`);
})