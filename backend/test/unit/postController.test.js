const mockingoose = require('mockingoose');
const Poswt = require('../../models/Post');
const { getAllPosts } = require('../../api/controllers/postControllers');

describe('Post Controller - getAllPosts (Unit)', () => {
    it('should return filtered posts with correct pagination', async () => {
        const req = { query: { page: 1, limit: 4, status: 'published' } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        mockingoose(Post).toReturn([{ title: 'Test', content: 'Content', author: 'Author' }], 'find');
        mockingoose(Post).toReturn(1, 'countDocuments');

        await getAllPosts(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            posts: expect.any(Array),
            totalPages: 1,
            currentPage: 1,
            total: 1
        }));
    });
});
