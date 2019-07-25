const db = require('../data/dbConfig');

const Users = require('./users-model.js');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  describe('insert()', () => {
    it('should insert user into the db', async () => {
      await Users.insert({ name: 'Chris', department: 'TL' });
      const response = await db('users');      
      expect(response).toHaveLength(1);
    });

    it('should fail to insert user into the db', async () => {
      try {
        await Users.insert({ name: 'Jackson' });
      } catch (error) {
        expect(error);
      }
    });
  });

  describe('getAll()', () => {
    it('should retrieve two users from the db', async () => {
      await Users.insert({ name: 'Chris', department: 'TL' });
      await Users.insert({ name: 'Winnie', department: 'SL' });
      const users = await Users.getAll();
      expect(users).toHaveLength(2);
    });
  });

  describe('remove(id)', () => {
    it('should delete one user from the db', async () => {
      await Users.insert({ name: 'Chris', department: 'TL' });
      await Users.insert({ name: 'Winnie', department: 'SL' });
      const deleted = await Users.remove(1);      
      expect(deleted).toBe(1);
      const response = await Users.getAll();      
      expect(response).toHaveLength(1);
    });

    it('should fail to delete non-existant user', async () => {
      const deleted = await Users.remove(1);      
      expect(deleted).toBe(0);
    });
  });
});