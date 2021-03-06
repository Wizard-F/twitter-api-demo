const express = require('express')
require('dotenv').config()

app = express()

require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));