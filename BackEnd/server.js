const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


// parse a body of http request
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/users', require('./Routes/Users'))
app.use(express.json())
//connect the mongodb
const strMongoDb = 'mongodb+srv://admin:admin@cluster0.j01jt.mongodb.net/wowitems?retryWrites=true&w=majority'
mongoose.connect(strMongoDb, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify:false});

//Mongoose schema defines the structure of the document
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    Name:String,
    Slot:String,
    Price:String,
    ImgUrl:String

})
//Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc
const itemsModel = mongoose.model("item", itemSchema);

app.use(express.static(path.join(__dirname,'../build')));
app.use('/static', express.static(path.join(__dirname,'build//static')));

// parse application/json
app.use(bodyParser.json());
//allowing us to use cross origin resource sharing ( cors)
app.use(cors());
//
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});


//app.get listening for http get request at the url in '' 
app.get('/api/items', (req, res) => {

    itemsModel.find((err,data)=>{
        res.json(data);
    })

});

//listening for http get request
app.get('/api/items/:id', (req, res)=>{
    console.log(req.params.id);
    //searching 
    itemsModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

//listening for put request to update
app.put('/api/items/:id', (req, res)=>{
    //searching and update
    itemsModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, data)=>{
        res.send(data);
    })
})
//listening for delete request
app.delete('/api/items/:id', (req, res) =>{
    console.log(req.params.id);
    //searching by _id and deleteing 
    itemsModel.findByIdAndDelete({_id:req.params.id}, (err, data)=>{
        if(err)
        res.send(err);
        res.send(data);
    })
})

//app.post listening for http get request at the url in '' 
app.post('/api/items', (req, res) => {
    console.log("test "+req.body)
    //creting new document in mongodb
    itemsModel.create({
        Name: req.body.name,
        Slot: req.body.slot,
        Price: req.body.price,
        ImgUrl: req.body.imgUrl
    })

    console.log('Item recieved!')
})

// app.get('*', (req,res)=>{
//     res.sendFile(path.join(__dirname + '/../build/index.html'))
// })

//listening at port 4000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})