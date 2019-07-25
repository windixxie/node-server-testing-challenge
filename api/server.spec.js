const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

describe('server', () => {

  it('db environment set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST /', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should return 201 Created', async () => {
      const user = { name: 'Bob', department: 'Hardware' };
      const response = await request(server).post('/').send(user);
      expect(response.status).toBe(201);
    });
  });

  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
});