const User = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res){
        const { email_user, pass_user } = req.body;
        try{
            const verifyUser = await User.findOne({
                where:{
                    email_user:email_user,
                    pass_user:pass_user
                }
            });
            if(verifyUser){
                const token = jwt.sign({email_user},pass_user,{
                    expiresIn: 86400 //La duración del token es de 1 dia
                });
                const updateuserToken = await User.update({
                    state_user:true,
                    token:token
                },{
                    where:{
                        id_user:verifyUser.id_user
                    }
                }); 
                res.status(200).json({
                    auth:true,
                    message:"The user now is in our system!",
                    token: token
                });
            }else{
                res.status(400).json({
                    auth:false,
                    message:"The username or password are wrong!"
                });
            }    
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async profile(req, res){
        try{
            if(req.userToken){
                res.status(200).json({ 
                    auth:true,
                    message:"The User logged in the system is...",
                    data:req.userToken
                });
            }else{
                res.status(401).json({
                    auth:false, 
                    message:"The user is not logged in!"
                });
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async validateToken(req, res, next){
        const token = req.headers['x-access-token'];
        try{
            if(!token){
                res.status(401).json({
                    auth:false, 
                    message: "The user is not logged in to execute this action!"
                });
            }else{
                const userToken = await User.findOne({
                    where:{
                        token:token
                    }
                });
                if(userToken){
                    req.userToken = userToken;
                    next();
                }else{
                    res.status(403).json({
                        message:"User don't exist to execute this action!"
                    });
                }
            }    
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
            next(err);
        }
    }
} 