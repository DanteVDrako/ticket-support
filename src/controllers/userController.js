const User = require('../models/users');

module.exports = { 
    async createUser(req, res){
        const { name_user, email_user, pass_user, type_user } = req.body;
        try{
            if(req.userToken && req.userToken.type_user=='admin'){
                const newUser = await User.create({
                    name_user: name_user,
                    email_user: email_user,
                    pass_user: pass_user,
                    state_user:false,
                    type_user:type_user 
                },{
                    fields: ['name_user','email_user','pass_user','state_user','type_user']
                });
                if(newUser){
                    res.status(200).json({
                        message:"Your user was created!",
                        data: newUser
                    });
                }
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async getAllUsers(req, res){
        try{
            if(req.userToken && (req.userToken.type_user=='admin' || req.userToken.type_user=='tech')){
                const listUsers = await User.findAll();
                if(listUsers){
                    res.status(200).json({
                        message:"Now take your results!",
                        data: listUsers
                    }); 
                }
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async getOneUser(req, res){
        const { iduser } = req.params;
        try{
            if(req.userToken && (req.userToken.type_user=='admin' || req.userToken.type_user=='tech')){
                const findedUser = await User.findOne({
                    where:{
                        id_user: iduser
                    }
                });
                if(findedUser){
                    res.status(200).json({
                        message:"The User you find is: ",
                        data:findedUser
                    });
                }
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                })
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async deleteUser(req, res){
        const { iduser } = req.params;
        try{
            if(req.userToken && req.userToken.type_user=='admin'){
                const deletedUser = await User.destroy({
                    where:{
                        id_user:iduser
                    }
                });
                res.status(200).json({message:"The User was deleted!"});
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async updateUser(req, res){
        const { iduser } = req.params;
        const { name_user, email_user, pass_user, state_user, type_user } = req.body;
        try{
            if(req.userToken && req.userToken.type_user=='admin'){
                const findedUser = await User.findOne({
                    where:{
                        id_user:iduser
                    }
                });
                const updateduser = await User.update({
                    name_user:name_user,
                    email_user:email_user,
                    pass_user:pass_user,
                    state_user:state_user,
                    type_user:type_user
                },{
                    where:{
                    id_user:iduser
                    }
                });
                res.status(200).json({ message:"The User was updated!" });
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    }
}

