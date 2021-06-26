const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller.js');
const postsController = require('../controllers/posts_controller.js');

console.log('Router loaded');
router.get('/posts' , postsController.posts);
router.get('/' , homeController.home);
router.use('/users', require('./users'));


// router.post('/' , function(err , users ){
//     if(err){
//         console.log(`Error in posting: ${err}`);
//     }
// })


module.exports = router;