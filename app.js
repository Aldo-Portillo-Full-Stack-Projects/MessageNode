const express = require('express')
  const morgan = require('morgan')
  
  
  const mongoose = require('mongoose');
  
  const Message = require('./models/message')
  const { response } = require('express');
  const { render } = require('ejs');
  
  // express app
  const app = express();
  
  // connect to mongodb & listen for requests
  const dbURI = "mongodb+srv://deploy:v6kN7fpI64KEG0GT@messageboard.9exeze1.mongodb.net/?retryWrites=true&w=majority";
  
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));
  
  //Register view engine\
  app.set('view engine', 'ejs'); 
  
  //middleware and static files
  app.use(express.static('public'))
  
  //Takes form data
  app.use(express.urlencoded({extended:true}));
  
  //Third party middleware npm morgan
  app.use(morgan('dev'))


//Get Requests
app.get('/', (req, res) => {

    Message.find().sort({createdAt: -1})
        .then((result) => {
            console.log(result)
            res.render('index', {title: 'Home', messages: result})
        })
        .catch((err)=> {
            console.log(err)
        })
});

app.get('/new', (req, res) => {

  res.render('new', { title: 'New'})
})



//Post Requests

app.post('/new', (req, res) => {
  const message = new Message(req.body)

  message.save()
      .then((result) => {
          res.redirect('/')
      })
      .catch((err)=> {
          console.log(err)
      })
})



//404 Status Code
app.use((req, res)=> {
  res.status(404).render('404', { title: 'Error'})
})