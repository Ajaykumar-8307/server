const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const useroute = require('./router/useroute');

const app = express();
const port = 3000;
const URL = 'mongodb+srv://kjajaykumar8307:password8307@cluster0.jhhdre3.mongodb.net/Users?retryWrites=true&w=majority';
app.use(cors());
app.use(express.json());

mongoose.connect(URL)
.then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.log("MongoDB Connection Failed", err);
});

app.get('/', async (req,res) => {
    const {name} = req.query;
    const username = await User.findOne({name});
    if (!username) {
        return res.status(404).json({message: "User not found"});
    }
    res.send(`Hello EveryOne hi ${username.email}`);
});

app.use('/api/v1/user', useroute);

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email, password});
        if(!user){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        res.send("Login Successful");
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
});

app.post('/delete', async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const user = await User.findOneAndDelete({name, email, password});
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (err) {
        return res.status(501).json({message: "Error Deleting User"});
    }
});

app.post('/update-password', async (req,res) => {
    const {email,oldpass,newpass} = req.body;
    try{
        const user = await User.findOne({email, password:oldpass});
        if(!user){
            return res.status(401).json({message: "Invalid Email and Old Password"});
        }
        if(user.password == newpass){
            return res.status(401).json({message: "Your are Entering the Old Password. Try New."});
        }

        user.password = newpass;
        await user.save();
        return res.status(200).json({message: "Password is Changed"});
    } catch (err){
        return res.status(501).json({message: "Error to Change Password"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});