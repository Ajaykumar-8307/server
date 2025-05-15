const UserModel = require('../models/usermodel');

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