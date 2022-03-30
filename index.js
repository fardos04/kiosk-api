const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const accountsRoute = require('./controllers/accounts');
const storeRoute = require('./controllers/store');
app.use('/api/accounts', accountsRoute);
app.use('/api/store', storeRoute);
const port = 5000;

const url = 'mongodb+srv://kiosk-user:v5EKQ1vGRqbVazMv@cluster0.yogor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url)
.then(results=>{
    console.log(results);
    app.listen(port, function(){
        console.log(`Server Is Running Via Port ${port}`);
    })
})
.catch(err=>{
    console.log(err);
})