import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth-config';

import User from '../../models/User';

class SessionRepository extends Error {
  async checkEmail(email) {
    const userFound = await User.findOne({ where: { email } });

    if (!userFound) {
      throw new Error('Email not registered');
    }
    return userFound;
  }

  async checkPassword(password, password_hash) {
    const isPassword = await bcrypt.compare(password, password_hash);
    if (!isPassword) {
      throw new Error('Password not match');
    }
    return isPassword;
  }

  async loginUser(isUser, isPassword) {
    if (isPassword) {
      const { id, name } = isUser;
      const loggedUser = {
        user: { id, name },
        token: jwt.sign({ id, name }, authConfig.secret_key, {
          expiresIn: authConfig.expiresIn,
        }),
      };
      return loggedUser;
    }
    throw new Error('Password and email dont match');
  }
}

export default new SessionRepository();
