const express = require('express')
const cors=require('cors')
const mysql=require('mysql2')
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
db.connect((err)=>{
    if(err){
        console.error("Error");
        return
    }
    console.log("Connection Successful");
})
app.post('/signup/buyer', async (req, res) => {
    try {
        const {email, password, name}=req.body;
        db.connect();
        const rows="INSERT INTO user (email,password,name) VALUES ('"+email+"', '"+password+"','"+name+"' )";
        db.query(rows,function(error, result){
            if(error){
                console.log(error);
                return
            }
            res.send("Account Created Successfully.");
        })
        
    } catch (error) {
        console.error('Error during signup:', error);
    res.status(500).json({ message: 'Signup failed' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})