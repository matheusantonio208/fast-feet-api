import server from './app';

class Server {
  constructor() {
    this.start(3333);
  }

  start(port) {
    server.listen(port);
  }
}

export default new Server();
