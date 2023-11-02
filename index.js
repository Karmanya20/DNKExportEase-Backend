const express = require('express')
const sql=require('mysql2')
const cors=require('cors')
const app = express()
const port = 5000
app.use(cors({
    origin:[],
    methods:["GET","POST"],
    credentials:true
}))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})