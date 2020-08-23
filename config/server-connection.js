import server from './app';

class Server {
  constructor() {
    this.start(4444);
  }

  start(port) {
    server.listen(port, () => {
      console.log('Server is running...');
    });
  }
}

export default new Server();
