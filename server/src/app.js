// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express() // create your express app
const mongo = require('mongodb')
const dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())


const MongoClient = mongo.MongoClient
var client;
var mongoClient = new MongoClient(process.env.DATABASE_URL, {  maxPoolSize: 50, 
    wtimeoutMS: 2500,
    useNewUrlParser: true }) 
mongoClient.connect((err, db) => { // returns db connection
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