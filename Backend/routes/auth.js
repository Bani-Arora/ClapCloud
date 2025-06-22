import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: 'User exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ name, email, password: hash }).save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
      (e, token) => e ? res.sendStatus(500) : res.json({ token }));
  } catch (e) { res.status(500).send('Server error'); }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(400).json({ msg: 'Invalid creds' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
      (e, token) => e ? res.sendStatus(500) : res.json({ token }));
  } catch { res.status(500).send('Server error'); }
});

export default router
