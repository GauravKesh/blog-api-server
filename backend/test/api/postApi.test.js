const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../app') // from app.js
const Post = require('../../models/Post');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        dbName: 'test'
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Post.deleteMany();
});

describe('GET /api/posts', () => {
    it('should return all posts', async () => {
        await Post.create({
            title: 'Test',
            content: 'Some content here for testing',
            author: 'Test Author'
        });

        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(200);
        expect(res.body.posts.length).toBeGreaterThan(0);
    }, 10000); // ⏱️ extend timeout
});
