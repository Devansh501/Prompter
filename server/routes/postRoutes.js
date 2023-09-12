const express = require('express')
const {testPing,createPost,getAllPosts,getPostByID,deletePost,updatePost,likePost,postsByUser,unlikePost,isLiked,getLikedPosts} = require("../controllers/postControllers")


const router = express.Router()
router.get("/",testPing)
router.post('/create',createPost)
router.get('/getAllPosts',getAllPosts)
router.post('/getUserPosts',postsByUser)
router.post('/getPostByID',getPostByID)
router.post('/deletePost',deletePost)
router.post('/updatePost',updatePost)
router.post('/likePost',likePost)
router.post('/unlikePost',unlikePost)
router.post('/isLiked',isLiked)
router.post('/getLikedPosts',getLikedPosts)
module.exports = router