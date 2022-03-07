
const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

exports.getAllComment = async (req, res) => {
  try {
    const comment = await Comment.findAll({
      where: { status: 'active' },
      include: [{
          model: User
      }]
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createComment = async (req, res) => {
  try {
    const { description, userId, postId } = req.body;

    const newComment = await Comment.create({
      description: description,
      userId: userId,
      postId: postId
    });

    res.status(201).json({
      status: 'success',
      data: {
        newComment
      }
    });
  } catch (error) {
    console.log(error);
  }
};
