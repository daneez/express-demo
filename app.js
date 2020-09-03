const express = require('express');

const app = express();

const port = 3000


app.use('/', function(req, res, next) {
    console.log('middleware1')
    next()
})

function logMessage(req, res, next) {
    console.log('middleware2');
    next();
}

app.get('/', logMessage, (req, res) => res.send('root dev fix sdfsdfs'))
app.get('/hello', (req, res) => {
    console.log('request comming in');
    res.send('world');
})

//http://localhost:3000/api/greeting/danni
app.get('/api/greeting/:name', (req, res) => {
  res.send(`hello ${req.params.name}`);
})

//http://localhost:3000/api/greeting/miss/danni
app.get('/api/greeting/:title/:name', (req, res) => {
  const { title, name } =  req.params;
  res.send(`hello ${title.toUpperCase()}.${name}`);
})

//middleware
app.use((req, res, next) => {
  console.log('global middleware:', Date.now());
  next();
})

app.use('/api/greeting/:name', (req, res, next) => {
  console.log('name middleware:', req.params.name);
  next();
})

app.listen(port, ()=> {console.log('application started at 3000...')} );