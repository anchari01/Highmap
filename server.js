const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./test1')
const cors = require('cors');

app.use (cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/user', db.getUsers)
app.get('/user/:id', db.getUserById)
app.post('/user', db.createUser)
app.put('/user/:id', db.updateUser)
app.delete('/user/:id', db.deleteUser)

app.listen(3000, function(){
  console.log(`App running on port 3000 .....`)
})


