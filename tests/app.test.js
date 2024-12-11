import {
  expect, use, should, request,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import dbClient from '../utils/db';

use(chaiHttp);
should();

describe('get status', () => {
  it('return status 200, and status true for redis and mongodb', async () => {
    const res = await request(app).get('/status').send();
    const body = JSON.parse(res.text);
    expect(body).to.eql({ redis: true, db: true });
    expect(res.statusCode).to.equal(200);
  });
});
