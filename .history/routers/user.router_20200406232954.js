const express = require('express');
const controller = require('../controllers/user.controller');
const validate = require('../validation/user.validation');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', auth.authentication , controller.index);
router.get('/search', controller.search);
router.get('/create', controller.createView);
router.post('/create', validate.createUser, controller.create);
router.get('/:id', controller.view);

module.exports = router;
