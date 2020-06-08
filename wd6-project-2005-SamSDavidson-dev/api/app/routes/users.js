// set up router
const router = require('express').Router();

//get controller
const userCtrl = require('../controllers/users');

// routes
router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.getOneById);
router.post('/', userCtrl.createUser);
router.post('/register', userCtrl.register);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.removeUser);

module.exports = router;