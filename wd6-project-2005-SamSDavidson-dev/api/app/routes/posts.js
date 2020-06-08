// set up router
const router = require('express').Router();

//get controller
const postCtrl = require('../controllers/posts');

// routes
router.get('/', postCtrl.getAll);
router.get('/:id', postCtrl.getOneById);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.removePost);

module.exports = router;