const express = require('express');
const app = express();
const port = 8000;


//use express router
app.use('/' , require('./routes/index.js'));

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