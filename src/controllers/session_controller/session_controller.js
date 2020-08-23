import Session from './session_repository';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const isUser = await Session.checkEmail(email);
      const isPassword = await Session.checkPassword(
        password,
        isUser.password_hash,
      );
      const loggedUser = await Session.loginUser(isUser, isPassword);

      return res.json(loggedUser);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new SessionController();
