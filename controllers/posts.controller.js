const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.findAll({
      Where: {status: 'active'},
      include: [{
          model: User,
        include: [{
            model: Comment
        }]
    }]
    });
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findOne({
             
            where: { id: id, status: 'active'},
            include: [{model: User,
            include: [{
                model: Comment
            }]}]
        });

        res.status(201).json({
            status: 'success',
            data: {
              post
            }
          });        
    } catch (error) {
        console.log(error)
    }
}

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId, imgUrl } = req.body;

    const newPost = await Post.create({
      title: title,
      content: content,
      userId: userId,
      imgUrl: imgUrl
    });

    res.status(201).json({
      status: 'success',
      data: {
        newPost
      }
    });
  } catch (error) {
    console.log(error);
  }
};
