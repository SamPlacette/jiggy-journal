const express = require('express')

const PORT = process.env.PORT || 8033

var app = express()

app.use(express.static('./build'))

app.listen(PORT)

console.log('http://localhost:' + PORT)
