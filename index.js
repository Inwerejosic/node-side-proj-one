const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const package = require('./package.json')


const port = process.env.port || process.env.PORT || 5000
const apiRoot = '/api'
const app = express()


// Configuring app
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(cors({ origin: /http:\/\/localhost/ }))
app.options('*', cors())

const router = express.Router()
router.get('/', (req, res) =>{
    res.send(`${package.au} - v${package.version}`)
})

// Getting the routes up and running
app.use(apiRoot, router)


// Starting the server
app.listen(port, () =>{
    console.log('I am up and running')
})

