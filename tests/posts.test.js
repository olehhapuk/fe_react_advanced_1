const request = require('supertest');

const app = require('../src/app');

describe('POST /api/posts', () => {
  test('should create new post', async () => {
    const response = await request(app).post('/api/posts').send({
      title: 'Post 1',
      description: 'Post 1 description',
    });

    expect(response.statusCode).toBe(200);
    // Перевірити чи response.type є 'application/json' - ДЗ
  });
});
