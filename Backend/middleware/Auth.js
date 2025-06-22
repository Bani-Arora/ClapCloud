import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
  const header = req.header('Authorization')
  if (!header) return res.status(401).json({ msg: 'No token' })
  const token = header.split(' ')[1]
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET).user
    next()
  } catch {
    res.status(401).json({ msg: 'Invalid token' })
  }
}
