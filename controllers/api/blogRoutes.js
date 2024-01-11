const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get a single blogpost
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    } res.status(200).json(blogData);
  } catch (error) {
    console.error('Error retrieving blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Create new blogpost
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update a blogpost
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//Delete a blogpost
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post a comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newComment)
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
module.exports = router;
