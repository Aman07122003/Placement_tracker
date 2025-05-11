import { verify } from 'jsonwebtoken';
import { user as _user } from '../lib/prisma';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new Error('Not authenticated');
    }

    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await _user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default authMiddleware;