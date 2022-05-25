const router=require('express').Router()
const Controller=require("../controllers/userController")
const {validateSignupRequest,validateSigninRequest,isRequestValidated}=require("../validator/validator")


router.post('/addUser',validateSignupRequest,isRequestValidated,Controller.addUser)
router.post('/userlogin',validateSigninRequest,isRequestValidated,Controller.userlogin)
router.get('/getUser',Controller.view)
router.put('/updateUser/:id',Controller.updateuser)
router.delete('/deleteUser/:id',Controller.deleteuser)

module.exports=router  