const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment', details: error.message });
  }
};

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments', details: error.message });
  }
};

// Get a comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comment', details: error.message });
  }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
  try {
    const [updated] = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Comment not found or no changes made' });
    }

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment', details: error.message });
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment', details: error.message });
  }
};
