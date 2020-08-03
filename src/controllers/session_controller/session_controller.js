import sessionRepository from './session_repository';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const isUser = await sessionRepository.checkEmail(email);
      const isPassword = await sessionRepository.checkPassword(
        password,
        isUser.password_hash,
      );
      const loggedUser = await sessionRepository.checkLoggedUser(
        isUser,
        isPassword,
      );

      return res.json(loggedUser);
    } catch (error) {
      return res.status(401).send(`${error}`);
    }
  }
}

export default new SessionController();
