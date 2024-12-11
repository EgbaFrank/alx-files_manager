import { expect, use, should } from 'chai';
import chaiHttp from 'chai-http';
import { promisify } from 'util';
import redisClient from '../utils/redis';

use(chaiHttp);
should();

describe('redis Client', () => {
  before(async () => {
    await redisClient.client.flushall('ASYNC');
  });

  after(async () => {
    await redisClient.client.flushall('ASYNC');
  });

  it('shows that connection is alive', async () => {
    expect(redisClient.isAlive()).to.equal(true);
  });

  it('returns key as null because it does not exist', async () => {
    expect(await redisClient.get('myKey')).to.equal(null);
  });

  it('set key can be called without issue', async () => {
    expect(await redisClient.set('myKey', 12, 1)).to.equal(undefined);
  });
  it('returns a key with null because it\'s expired', async () => {
    const sleep = promisify(setTimeout);
    await sleep(1200);
    expect(await redisClient.get('myKey')).to.equal(null);
  });
});
