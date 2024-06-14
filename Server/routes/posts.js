const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// POST /api/posts - Create a new post
router.post("/", async (req, res) => {
  const { title, content, author, userId } = req.body;
  try {
    // Create a new Post instance
    const newPost = new Post({ title, content, author, userId });

    // Save the new post to the database
    await newPost.save();

    // Return the newly created post as JSON response
    res.status(201).json(newPost);
  } catch (error) {
    // Handle any errors that occur during saving
    res.status(500).json({ message: error.message });
  }
});

// GET /api/posts - Get all posts
router.get("/", async (req, res) => {
  try {
    // Fetch all posts and sort by createdAt descending
    const posts = await Post.find().sort({ createdAt: -1 });

    // Return the posts as JSON response
    res.status(200).json(posts);
  } catch (error) {
    // Handle any errors that occur during fetching
    res.status(500).json({ message: error.message });
  }
});

// GET /api/posts/:id - Get a specific post by ID
router.get("/:id", async (req, res) => {
  try {
    // Find a post by its ID
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the post as JSON response
    res.status(200).json(post);
  } catch (error) {
    // Handle any errors that occur during fetching
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/posts/:id - Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete a post by its ID
    const post = await Post.findByIdAndDelete(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return success message as JSON response
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during deletion
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
