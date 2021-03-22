const express = require('express');
const  { body } = require('express-validator');


const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.get('/post/:postId', feedController.getPost);
router.put('post/:postId', feedController.updatePost);
router.post('/post', 
    [
        body('category').trim().isLength({min: 5}),
        body('colors').trim().isLength({min: 3}),
        body('company').trim().isLength({min: 3}),
        body('description').trim().isLength({min: 5}),
        body('featured').trim().isLength({min: 4}),
        body('images').trim().isLength({min: 5}),
        body('name').trim().isLength({min: 5}),
        body('price').trim().isLength({min: 3}),
        body('reviews').trim().isLength({min: 3}),
        body('shipping').trim().isLength({min: 4}),
        body('stars').trim().isLength({min: 1}),
        body('stock').trim().isLength({min: 5}),
    ],
    feedController.createPost);

module.exports = router;