// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express() // create your express app
// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = 'mongodb+srv://yeg2799:yeg1123581321.@todo.qyihjrr.mongodb.net/?retryWrites=true&w=majority'
var client;
var mongoClient = new MongoClient(uri, {  maxPoolSize: 50, 
    wtimeoutMS: 2500,
    useNewUrlParser: true }) 
mongoClient.connect((err, db) => { // returns db connection
    console.log(db);
  if (err != null) {
    console.log(err)
    return
  }
  client = db
})

app.get('/todo', (req, res) => {
    const collection = client.db("todo").collection("list")
    collection.find().toArray(function (err, results) {
      if (err) {
        res.send([])
        return
      }
      
      res.send(results)
    })
  })

app.listen(process.env.PORT || 8081) // client is already running on 8080