// console.log("May Node be with you, young padawan")

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://test:test@cluster0-ieizd.mongodb.net/pokemon-friendcodes?retryWrites=true&w=majority";
var db, collection; //variable for database
const dbName = "pokemon-friendcodes";

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json())


app.listen(3000, function(){
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) =>{
    if (err) return console.log(err);
    db = client.db(dbName); //the database name is
  })
  console.log('listening on 3000')
})

// app.get('/', (req,res) => {
//   res.sendFile(__dirname + '/index.html')
//   var cursor = db.collection('quotes').find().toArray(function(err,results){
//     // if (err) return console.log(err)
//     // res.render('index.ejs', {quotes: result})
//     console.log(results)
//     // console.log(result)
//   })
// })

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/inGameCodes', (req, res) => {
  db.collection('quotes').save({name: req.body.name, friendcode: req.body.friendcode}, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
  console.log('Hello, post req and res has been made!')
  console.log(req.body)
})

app.put('/replace', (req, res) =>{
  db.collection('quotes').findOneAndUpdate({name:req.body.name},{
    $set: {
      friendcode: req.body.friendcode
    }
  }, {
    sort: {_id:-1},
    upsert: true
  },
  (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
  res.redirect('/')
})




app.delete('/quotes', (req, res) =>{
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A Pokemon Go friendcode got deleted'})
  })
})
