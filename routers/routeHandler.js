const router = require('express').Router();

router.use('/user',require("./userRoutes"))
router.use('/task',require("./taskRouter"))

module.exports = router;