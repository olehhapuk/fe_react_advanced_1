const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const { Post } = require('../src/models');

describe('POST /api/posts', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await Post.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should create new post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .auth('token', {
        type: 'bearer',
      })
      .send({
        title: 'Post 1',
        description: 'Post 1 description',
      });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('title', 'Post 1');
    expect(response.body).toHaveProperty('description', 'Post 1 description');
    // expect(response.body).toEqual({
    //   title: '',
    //   description: '',
    // });
    expect(response.body).toHaveProperty('_id');
  });

  test('should find one new post', async () => {
    const response = await request(app).get('/api/posts');

    expect(response.body).toHaveProperty('length', 1);
    // expect(response.body.length).toBe(1);
  });
});
