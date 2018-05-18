const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const mongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/"


var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

const bodyParser = require("body-parser")

const app = express()

app.use(express.static('views/layouts'));
app.use(cookieParser())
app.use(session({
  secret: 'i need more beers',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: url,
  }),
  unset: "keep"
}))

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views/layouts'))




app.get('/', (request, response) => {
    console.log(request.session.user)
    if(request.session.user != undefined){
      response.render('index', {
      })
    }else{
      response.redirect('/login')
    }
})
base = [{qst:'Question 1',mssg : 'Answer 1'},
{qst:'Question 2',mssg : 'Answer 2'},
{qst:'Question 3',mssg : 'Answer 3'},
{qst:'Question 4',mssg : 'Answer 4'}
]
app.get('/answers' , (req, res) => {
  res.render('answers',{
    base:base
  })
})
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.post("/login", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    mongoClient.connect(url, function(err, client){

         const db = client.db("site");
         const collection = db.collection("users");
         collection.findOne({"login":request.body.login}).then(function(value){
           if (value != null){
             if (value.password == request.body.password){
               request.session.user = request.body.login
               console.log('Login success')
               response.redirect('/')
             }else{
               response.send('Bad password')
               //response.redirect('/login')
                   }
            }else{
              response.send('Bad login')
            }

      })

    })
});

app.get('/login', (req, res) =>{
  res.render('login'),{
    name:'John'
  }
})

app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)
    mongoClient.connect(url, function(err, client){
         if (err){
           return console.log(err)
         }
         const db = client.db("site");
         const collection = db.collection("users");
         let user = {login: request.body.login, age: request.body.age, sex: request.body.sex, email: request.body.email, password: request.body.password}
         collection.insertOne(user, function(err, result){

             if(err){
                 return console.log(err)
             }
             client.close()
             response.redirect('/login')
         })
    })
})

app.get('/register', (req, res) =>{
  res.render('register'),{
    name:'John'
  }
})

app.post('/getansw',urlencodedParser, (req, res)=>{
  let date = new Date().toLocaleString()
  date = date.split(' ')
  console.log(date)
  mongoClient.connect(url, (err, client)=>{
    var db = client.db('site')
    var collection = db.collection('question')
    let question = {from: req.session.user, question: req.body.question, to:'', answer:'', date: date[0], time: date[1]}
    collection.insertOne(question, (err, result)=>{
      if(err){
        return console.log(err)
      }


    })
  client.close()
  })

  res.redirect('/')
})

app.listen(3000)
