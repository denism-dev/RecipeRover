const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
    registerUser: async (req, res) => {
        try{
            // ! Check if the user already exists 
            const potentialUser = await User.findOne({email:req.body.email})
            if (potentialUser){
                res.status(400).json({message:'This email already exists please log in'})
            }
            else{
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, SECRET, {expiresIn:'2h'})
                console.log(userToken);
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json({ _id: newUser._id, email: newUser.email })
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({error: err})
        }
    },
    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch){
                    const userToken = jwt.sign({_id: user._id, email:user.email}, SECRET, {expiresIn:'2h'})
                    res.status(200).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json({ _id: user._id, email: user.email })
                }
                else{
                    res.status(400).json({message:'Invalid Email/Password'})
                }
            }
            else{
                res.status(400).json({message:'Invalid Email/Password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Logged Out Successfully'})
    }

}