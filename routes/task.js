var express = require('express');
var router = express.Router();
const taskcontroller = require('../controller/TaskController.js');

router.get('/', taskcontroller.form);

router.post('/create', taskcontroller.create);

router.get('/assign/form', taskcontroller.assignForm);
router.post('/assign', taskcontroller.assignTask);

router.get('/complete/form', taskcontroller.taskCompletionForm);
router.post('/completed', taskcontroller.completed);

module.exports = router;
