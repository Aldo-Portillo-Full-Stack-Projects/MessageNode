const express = require('express')
  const morgan = require('morgan')
  const dotenv = require("dotenv").config()
  
  
  const mongoose = require('mongoose');
  
  const Message = require('./models/message')
  const { response } = require('express');
  const { render } = require('ejs');
  
  // express app
  const app = express();

let PORT = process.env.PORT || 5000;



  mongoose
  .set("strictQuery", false)
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(PORT, () => {
          console.log(`Listening on Port ${PORT}`);
        })
    })
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