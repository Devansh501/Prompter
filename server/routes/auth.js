const express = require('express')
const {test,registerUser,loginUser} = require('../controllers/authControllers')

const router = express.Router();

router.get("/",test);
router.post("/register",registerUser);
router.post("/login",loginUser)

module.exports = router