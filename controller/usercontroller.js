const UserModel = require('../models/usermodel');

exports.home = async (req,res) => {
    return res.send("Hello");
}

exports.UserControl = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const existuser = await UserModel.findOne({email});

        console.log(existuser);
        if(existuser){
            return res.status(501).json({message: "User Already Exist"});
        }
        const newuser = await UserModel.create({
            name,
            email,
            password
        });
        return res.status(200).json({user:newuser,message: "User Created Successfully"});
    } catch (err){
        return res.status(401).json({message: "Error to Create User"});
    }
}

exports.Userlogin = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email,password});
        if(!user){
            return res.status(401).json({message: "User Not Exist Create a Account"});
        }
        return res.status(200).json({message: "Welcome", user: user.name});
    } catch (err){
        return res.status(501).json({message: "Error to Login"});
    }
}

exports.Delete = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const user = await UserModel.findOneAndDelete({name, email, password});
        if(!user){
            return res.status(401).json({message: "User not Exist"});
        }
        return res.status(200).json({message: "User Deleted Successfully", user: user.name});
    } catch (err){
        return res.status(501).json({message: "Error to Deleting User"});
    }
}

exports.update = async (req,res) => {
    const {email, oldpass, newpass} = req.body;
    try{
        const user = await UserModel.findOne({email, password:oldpass});
        if(!user){
            return res.status(401).json({message:"User Not Exist"});
        }
        if(newpass == user.password){
            return res.status(401).json({message:"Your using old password enter a new password"});
        }
        user.password = newpass;
        await user.save();
        return res.status(200).json({message:"Password Changed"});
    } catch (err){
        return res.status(501).json({message: "Error to Change Password"});
    }
}
