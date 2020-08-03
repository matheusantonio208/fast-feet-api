import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth-config';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedTokenInObjectJson = await promisify(jwt.verify)(
      token,
      authConfig.secret_key,
    );
    req.userId = decodedTokenInObjectJson.id;

    return next();
  } catch (error) {
    return res.status(400).send(`${error}`);
  }
};
