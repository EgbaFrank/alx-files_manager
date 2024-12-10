import redisClient from './utils/redis';

(async () => {
  await new Promise((resolve) => {
    redisClient.client.on('connect', () => {
      console.log('Redis client connected to the server');
      resolve();
    });
  });

  console.log(await redisClient.isAlive());
  console.log(await redisClient.get('myKey'));
  await redisClient.set('myKey', 12, 5);
  console.log(await redisClient.get('myKey'));

  setTimeout(async () => {
    console.log(await redisClient.get('myKey'));
  }, 1000 * 10);
})();
