const Post = require('../../models/Post');

exports.getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 60, status = 'published' } = req.query;
        console.log(req.query)
        const posts = await Post.find({ status })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v');

        const total = await Post.countDocuments({ status });
        console.log({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        })
        res.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).select('-__v');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid post ID' });
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content, and author are required' });
        }

        const existingPost = await Post.findOne({
            title: { $regex: new RegExp(`^${title}$`, 'i') }
        });
        if (existingPost) return res.status(400).json({ message: 'A post with this title already exists' });

        const post = new Post({
            title: title.trim(),
            content: content.trim(),
            author: author.trim(),
            tags: tags ? tags.map(tag => tag.trim()).filter(Boolean) : []
        });

        const savedPost = await post.save();
        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
        console.error('Error creating post:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (error.code === 11000) return res.status(400).json({ message: 'Duplicate post title' });
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content, author, tags, status } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (title) post.title = title.trim();
        if (content) post.content = content.trim();
        if (author) post.author = author.trim();
        if (tags) post.tags = tags.map(tag => tag.trim()).filter(Boolean);
        if (status) post.status = status;

        const updatedPost = await post.save();
        res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid post ID' });
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid post ID' });
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};
