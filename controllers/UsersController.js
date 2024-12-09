import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Missing email' });
        return;
      }

      if (!password) {
        res.status(400).json({ error: 'Missing password' });
        return;
      }

      const existingUser = await dbClient.usersCollection.findOne({ email });

      if (existingUser) {
        res.status(400).json({ error: 'Already exist' });
        return;
      }
      const hashedPassword = sha1(password);

      const result = await dbClient.usersCollection.insertOne({
        email,
        password: hashedPassword,
      });

      res.status(201).json({ id: result.insertedId, email });
    } catch (err) {
      console.error('Error in postNew:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getMe(req, res) {
    try {
      const token = req.header('X-Token');
      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const userId = await redisClient.get(`auth_${token}`);
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const user = await dbClient.usersCollection.findOne({ _id: userId });
      if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.error('Error in getMe:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UsersController;
