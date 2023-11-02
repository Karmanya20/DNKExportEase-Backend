const express = require('express')
const cors=require('cors')
const mysql=require('mysql')
const app = express()
const port = 5000
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}))
app.use(express.json())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ballislife@10',
    database:'dnk'
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})