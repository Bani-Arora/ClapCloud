import express from 'express'
import auth from '../middleware/auth.js'
import Post from '../models/Post.js'
import upload from '../middleware/upload.js'

const router = express.Router()

// Create post
router.post(
  '/',
  auth,
  upload.single('image'),
  async (req, res) => {
    const post = new Post({
      user: req.user.id,
      content: req.body.content,
      image: req.file?.path || '',
    });
    await post.save();
    res.json(post);
  }
);

// Global feed
router.get('/', async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name avatar');
  res.json(posts);
});

// Clap (like)
router.post('/clap/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.claps++;
  await post.save();
  res.json({ claps: post.claps });
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // check ownership
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router
