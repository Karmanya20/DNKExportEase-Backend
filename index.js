const express = require('express')
const cors=require('cors')
const mysql=require('mysql2')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwt_sec="Hellothisism$e"
const fetchuser=require('../middleware/fetch')
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
app.post('/signup/buyer', [body('name').notEmpty(),
    body('email',"Enter a valid email.").isEmail().notEmpty(),
body('password', "password must be at least 8 characters.").isLength({min: 8}).notEmpty()],async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
     }
    try {
        const {email, password, name}=req.body;
        const salt=await bcrypt.genSalt(10)
        secPass=await bcrypt.hash(req.body.password, salt);
        db.connect();
        const rows="INSERT INTO user (email,password,name) VALUES ('"+email+"', '"+secPass+"','"+name+"' )";
        db.query(rows,function(error ){
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