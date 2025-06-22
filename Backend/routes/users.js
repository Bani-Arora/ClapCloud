import express from 'express'
import auth    from '../middleware/auth.js'
import User    from '../models/User.js'
import upload  from '../middleware/upload.js'

const router = express.Router()


// Get my profile
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Update profile
router.put('/me', auth, async (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, bio, avatar },
    { new: true }
  ).select('-password');
  res.json(user);
});

// Upload/change avatar
router.post(
  '/me/avatar',
  auth,
  upload.single('image'),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.path },
      { new: true }
    ).select('-password');
    res.json(user);
  }
);

export default router
