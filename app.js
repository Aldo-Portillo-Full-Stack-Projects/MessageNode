const express = require('express')
const morgan = require('morgan')
const { response } = require('express');
const { render } = require('ejs');
const app = express();
//Register view engine\
app.set('view engine', 'ejs'); 

//middleware and static files
app.use(express.static('public'))

//Takes form data
app.use(express.urlencoded({extended:true}));

//Third party middleware npm morgan
app.use(morgan('dev'))

app.listen(3000)


app.use((req, res)=> {
  res.status(404).render('404', { title: 'Error'})
})