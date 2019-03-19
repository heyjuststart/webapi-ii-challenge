const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use('/', (req, res) => res.send('API up and running!'));
server.use('/api/posts', postsRouter);

server.listen(4000, () => console.log('API running on  port 4000'));
