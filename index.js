const express = require('express');
const app = express();
const port = 8000;

app.listen(port , function(err){
    if(err){
        console.log(`${err}: Error in firing up express server on port: ${port}`);
        return;
    }
    console.log(`Express server up & running on port: ${port}`);
})