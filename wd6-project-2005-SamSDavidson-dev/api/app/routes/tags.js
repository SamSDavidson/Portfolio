// set up router
const router = require('express').Router();

//get controller
const tagCtrl = require('../controllers/tags');

// routes
router.get('/', tagCtrl.getAll);
router.get('/:id', tagCtrl.getOneById);
router.post('/', tagCtrl.createTag);
router.put('/:id', tagCtrl.updateTag);
router.delete('/:id', tagCtrl.removeTag);

module.exports = router;