const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.port || process.env.PORT || 5000

const app = express()

// Configuring app
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(cors({ origin: /http:\/\/localhost/ }))
app.options('*', cors())

// Starting the server
app.listen(port, () =>{
    console.log('I am up and running')
})

