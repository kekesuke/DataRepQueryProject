const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('config')

const users = require('./Routes/api/Users')
const auth = require('./Routes/api/Auth')

// parse a body of http request

//connect the mongodb
const strMongoDb = config.get('mongoURI')
mongoose.connect(strMongoDb, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

//Mongoose schema defines the structure of the document


app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//allowing us to use cross origin resource sharing ( cors)
app.use(cors());
//
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/api/items', require('./Routes/api/Items'))
app.use('/api/users', require('./Routes/api/Users'))
app.use('/api/auth', require('./Routes/api/Auth'))



// app.get('*', (req,res)=>{
//     res.sendFile(path.join(__dirname + '/../build/index.html'))
// })

//listening at port 4000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})