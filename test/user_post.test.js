import request from 'supertest';
import pool from '../config/db.js';
import router from '../user_post.js';

describe('POST /users', () => {
  afterAll(async () => {
    await pool.end(); // close the DB pool after all tests
  });

  it('should create a new user with valid data', async () => {
    const res = await request(router).post('/users').send({
      username: 'TestUser',
      email: 'testuser@example.com',
      password: 'secure123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Successful operation');
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(router).post('/users').send({
      username: 'TestUser',
      email: 'invalid-email',
      password: 'secure123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid input');
  });
});
