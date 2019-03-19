const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

// handles urls beginning with /api/posts

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The posts information could not be retrieved.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The post information could not be retrieved.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      return res
        .status(400)
        .json({
          errorMessage: 'Please provide title and contents for the post'
        });
    }
    const post = await Posts.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      return res.status(200);
    } else {
      return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post'
    });
  }
});

router.put('/:id', async (req, res) => {
  if(!req.body.title || !req.body.content) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The post information could not be modified.'
    });
  }
});

router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Posts.findpostMessages(req.params.id);

    if (messages && messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: 'No messages for this post' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error getting the messages for this post' });
  }
});

module.exports = router;
