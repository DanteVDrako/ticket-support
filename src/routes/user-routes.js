const { Router } = require('express');
const router = Router();
const controller = require('../controllers/userController');
const auth = require('../controllers/authController');

//List of all users from db
router.get('/api/v1/all_user', auth.validateToken, controller.getAllUsers);

//Create a new user in db
router.post('/api/v1/create_user/', auth.validateToken, controller.createUser);

//Get one user from db using an id
router.get('/api/v1/get_user/:iduser', auth.validateToken, controller.getOneUser);

//Delete one user form db using an id
router.delete('/api/v1/delete_user/:iduser', auth.validateToken, controller.deleteUser);

//Update an user from db using an id
router.put('/api/v1/update_user/:iduser', auth.validateToken, controller.updateUser);

module.exports = router; 