const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller.js');
const userController = require('../controllers/user_controller.js');
const posts = require('../controllers/posts_controller.js');

console.log('Router loaded');

router.get('/' , homeController.home);

// router.post('/' , function(err , user ){
//     if(err){
//         console.log(`Error in posting: ${err}`);
//     }
// })


module.exports = router;