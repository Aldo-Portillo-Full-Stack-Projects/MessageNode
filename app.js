const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { response } = require('express');
const { render } = require('ejs');
const app = express();

const Message = require('./models/message')


const dbURI = 'mongodb+srv://admin:toorMB@messageboard.9exeze1.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));



app.set('view engine', 'ejs'); 

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'))




app.get('/', (req, res) => {

  const messages = [
    {
      text: "Hi there!",
      user: "Amando",
    },
    {
      text: "Hello World!",
      user: "Charles",
    }
  ];

  res.render('index', {title: 'Home', messages})
});

app.get('/new', (req, res) => {
  res.render('new', { title: 'New'})
})


app.use((req, res)=> {
  res.status(404).render('404', { title: 'Error'})
})