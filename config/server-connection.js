import server from './app';

class Server {
  constructor() {
    this.start(process.env.APP_PORT);
  }

  start(port) {
    server.listen(port);
  }
}

export default new Server();
