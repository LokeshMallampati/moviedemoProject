const express = require('express');

const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const DB = 'mongodb+srv://mlokesh:S123456@cluster0.mvbi8.mongodb.net/MovieSet?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex : true,
     useUnifiedTopology: true,
     useFindAndModify:false
}).then(() =>{
    console.log('connection Succesful');
}).catch((err) => console.log('no successful'));


app.use(bodyParser.json());


//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts',postsRoute);



const port = process.env.port || 5000;

app.listen(port, ()=> console.log('Server is up'));