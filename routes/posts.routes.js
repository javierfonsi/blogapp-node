const express = require('express')

const router = express.Router()

const {
    getAllPost,
    getPostById,
    createPost
} = require('../controllers/posts.controller')

router.get('/', getAllPost)

router.get('/:id', getPostById)

router.post('/', createPost)

module.exports = { postsRouter: router}