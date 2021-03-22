const  { validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.getPosts = (req, res, next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({posts: posts });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
   
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed. Check entered data',
            errors: errors.array()
        })
    }
    const category = req.body.category;
    const colors = req.body.colors;
    const company = req.body.company;
    const description = req.body.description;
    const featured = req.body.featured;
    const images = req.body.images;
    const name = req.body.name;
    const price = req.body.price;
    const reviews = req.body.reviews;
    const shipping = req.body.shipping;
    const stars = req.body.stars;
    const stock = req.body.stock;

    const post = new Post({
        category: category,
        colors: colors,
        company: company,
        description: description,
        featured: featured,
        images: images,
        name: name,
        price: price,
        reviews: reviews,
        shipping: shipping,
        stars: stars,
        stock: stock  
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product created successfully',
            post: result
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
};

exports.getPost = (req, res, next) => {
    const postId= req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error("Product not found");
            error.statusCode =500;    
            throw error;      
        }
        res.status(200).json({ post: post })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
};

exports.updatePost = (req, res, next) => {
    const postId= req.params.postId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Entered data is wrong");
            error.statusCode = 422;    
            throw error; 
    }
    const category = req.body.category;
    const colors = req.body.colors;
    const company = req.body.company;
    const description = req.body.description;
    const featured = req.body.featured;
    const images = req.body.images;
    const name = req.body.name;
    const price = req.body.price;
    const reviews = req.body.reviews;
    const shipping = req.body.shipping;
    const stars = req.body.stars;
    const stock = req.body.stock;
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error("Couldn´t find product");
            error.statusCode = 422;    
            throw error; 
        }
        post.category = category;
        post.colors = colors;
        post.company = company;
        post.description = description;
        post.featured = featured;
        post.images = images;
        post.name = name;
        post.price = price;
        post.reviews = reviews;
        post.shipping = shipping;
        post.stars = stars;
        post.stock = stock;
        return post.save();
    })
    .then(result => {
        res.status(201).json({message: 'Product updated', post: result})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
};