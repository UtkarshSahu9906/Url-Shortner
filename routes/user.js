const express = require('express')
const {handleUserSignin} = require('../controllers/user')

const router =express.Router();

router.post('/',handleUserSignin)


module.export = router;