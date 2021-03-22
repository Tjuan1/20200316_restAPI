const express = require('express');
const mongoose = require('mongoose');
const MONGODB_URL = require('./.env')


const feedRoutes = require('./routes/feed');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    //here we allow access to all the incoming servers and also access to some methods
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/feed', feedRoutes);

mongoose.connect( MONGODB_URL,  {useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    app.listen(8080);
})
.catch();

