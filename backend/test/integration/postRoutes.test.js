const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app') // Export app from server.js
const Post = require('../../models/Post');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Post.deleteMany();
});

describe('POST /api/posts', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({ title: 'Test Post', content: 'Valid content here', author: 'Gaurav' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post.title).toBe('Test Post');
    });
});
