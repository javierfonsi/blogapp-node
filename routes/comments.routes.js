const express = require('express');

const {
  createComment,
  getAllComment
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', getAllComment);

router.post('/', createComment);

module.exports = { commentsRouter: router };
