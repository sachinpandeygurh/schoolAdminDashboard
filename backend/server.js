const express = require('express')
require("./src/db/mongoose")
const userRouter = require('./src/routers/user')
const app = express()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(userRouter)

app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})