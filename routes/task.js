var express = require('express');
var router = express.Router();
const taskcontroller = require('../controller/TaskController.js');

router.get('/', taskcontroller.form);

router.post('/create', taskcontroller.create);

module.exports = router;
