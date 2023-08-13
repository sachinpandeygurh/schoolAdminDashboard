const express = require('express')
require("./db/mongoose")

const app = express()

const port = process.env.PORT || 8080

app.use(express.json())

app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})