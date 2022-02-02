const express =require('express')

const router = express.Router()

const {register,login} = require('../controllers/auth')
const {getUsers,getUser,deleteUser, updateUser} = require('../controllers/user')
const {addMessage} = require('../controllers/message')
const {createFeed,getfeeds,addLike, addComment,getComments} = require('../controllers/feed')
const {addFollowers} = require('../controllers/followers')

router.post('/register',register)
router.post('/login',login)

router.get('/users',getUsers)
router.get('/user/:id',getUser)
router.delete('/user/:id',deleteUser)
router.patch('/user/:id',updateUser)

router.post('/message/:id',addMessage)

router.post('/feed',createFeed)
router.get('/feeds',getfeeds)
router.post('/like',addLike)
router.post('/comment',addComment)
router.get('/comments/:id',getComments)

router.post('/follow/:id',addFollowers)


module.exports= router