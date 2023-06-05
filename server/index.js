const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
app.use(bodyParser.json())
app.use(cors())
dotenv.config()


const Users = mongoose.model('Users', new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isAdmin:Boolean
}))

//regitser
app.post('/api/register', async(req,res)=>{
    const {username, email, password} = req.body

    const existedUsername = await Users.findOne({username: username});
    const existedMail = await Users.findOne({email:email})

    if(existedUsername){
        res.json({message:'username already existed'})
        return
    }
    if(existedMail){
        res.json({message:'email already used'})
        return
    }

    const salt = await bcrypt.genSalt(10)//500ms
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new Users({
        username:username,
        email:email,
        password:hashedPassword
    })

    await newUser.save()
    res.json({message:'user sign up succesfully'})


})



//login
app.post('/api/login', async(req,res)=>{
    const {username, password} = req.body
    const existedUsername = await Users.findOne({username:username});

    if(!existedUsername){
        res.json({auth:false, message:'username not found'});
        return
    }
    else{
        const isValid = await bcrypt.compare(password, existedUsername.password)

        if(!isValid){
            res.json({auth:false, message:'password is incorrect'})
        }
        else{
            res.json({auth:true, message:'signed in succesfully'})
        }
    }
})


//users

DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(()=>{
    console.log('MongoDB Connected!')
})


app.get('/api', (req, res) => {
  res.send('Hello World!')
})

PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})