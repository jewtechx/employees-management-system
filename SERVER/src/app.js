const express = require("express")

const path = require("path")

const cors = require("cors")

const { employees } = require('./routes/employees/employees.router')

const app = express()

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use((req,res,next) => {
    const start = Date.now()
    next()
    const delta = Date.now() - start
    console.log(`Request: ${req.method} , Time taken: ${delta}ms`)
})

app.use(express.json())
app.use('/employees',employees)

module.exports = app