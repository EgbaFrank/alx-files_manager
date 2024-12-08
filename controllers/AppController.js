class AppController {
  static getStatus(req, res) {
    res.status(200).json({ test: 'Hello Holberton School! 1' });
  }

  static getStats(req, res) {
    res.status(200).json({ test: 'Hello Holberton School! 2' });
  }
}

export default AppController;
