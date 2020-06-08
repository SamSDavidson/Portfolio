// set up router
const router = require('express').Router();

//get controller
const commentCtrl = require('../controllers/comments');

// routes
router.get('/', commentCtrl.getAll);
router.get('/:id', commentCtrl.getOneById);
router.get('/comments/:id', commentCtrl.getCommentsByPost);
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.updateComment);
router.delete('/:id', commentCtrl.removeComment);

module.exports = router;