const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const { generatePost } = require('../services/openaiService');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/generate', protect, generatePost);

module.exports = router;
