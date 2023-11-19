const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const webhook = require('./route/webhook')
dotenv.config()
const app = express()

app.use(cors({credentials: true, origin: '*'}), express.json())
app.use(webhook)

app.listen(9000, () => {
    console.log('Server is running on port 9000')
})