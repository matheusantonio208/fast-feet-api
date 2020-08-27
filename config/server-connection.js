import server from './app';

class Server {
  constructor() {
    this.start(4444);
  }

  start(port) {
    server.listen(port);
  }
}

export default new Server();
